import osmnx as ox
from fastapi import FastAPI, HTTPException, Body
from shapely.geometry import Polygon
from math import floor
from typing import List, Tuple
from pydantic import BaseModel, Field
import json

# Constants
HECTARE_TO_SQ_M = 10000  # 1 hectare = 10,000 square meters

# Create a FastAPI app
app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}


# Read the JSON file
with open("data/water_pollution.json", "r") as json_file:
    water_pollution = json.load(json_file)

@app.get("/water_pollution")
def get_water_pollution():
    return water_pollution

# Read the JSON file
with open("data/air_pollution.json", "r") as json_file:
    air_pollution = json.load(json_file)

@app.get("/air_pollution")
def get_air_pollution():
    return air_pollution

# Read the JSON file
with open("data/development_energy.json", "r") as json_file:
    development_energy = json.load(json_file)

@app.get("/development_energy")
def get_development_energy():
    return development_energy


# Create a Pydantic model for the request body
class PolygonRequestModel(BaseModel):
    polygon: List[Tuple[float, float]] = Field(
        default=[(85.22823163068318, 27.730537095684944),
                 (85.25192090070271, 27.770947059267456),
                 (85.30341931378865, 27.746945956706433),
                 (85.27114697492146, 27.71625329811123)],
        description="A list of tuples representing the polygon coordinates."
    )

# Function to calculate forest area
def calculate_forest_area(polygon):
    # You've already done this
    tags = {'landuse': 'forest'}
    geometries = ox.geometries_from_polygon(polygon, tags)
    geometries.crs = 'EPSG:4326'
    geometries = geometries.to_crs('EPSG:3857')
    forest_area_sqm = geometries.geometry.area.sum()
    return forest_area_sqm

# Function to estimate the number of trees
def estimate_number_of_trees(forest_area_sqm):
    avg_tree_density_per_hectare = 500  # hypothetical average tree density
    number_of_trees = (forest_area_sqm / HECTARE_TO_SQ_M) * avg_tree_density_per_hectare
    return number_of_trees

# Function to estimate carbon absorption
def estimate_carbon_absorption(forest_area_sqm):
    average_carbon_seq_rate = 0.2  # hypothetical value
    carbon_absorption = (forest_area_sqm / HECTARE_TO_SQ_M) * average_carbon_seq_rate
    return carbon_absorption

# Define a POST endpoint to receive the polygon coordinates as a list
@app.post("/calculate_forest_metrics")
async def calculate_forest_metrics(request_data: PolygonRequestModel):
    try:
        # Extract the list of coordinates from the request model
        polygon = request_data.polygon

        # Convert the list of tuples into a Shapely Polygon
        shapely_polygon = Polygon(polygon)

        forest_area = calculate_forest_area(shapely_polygon)
        number_of_trees = estimate_number_of_trees(forest_area)
        carbon_absorption = estimate_carbon_absorption(forest_area)

        return {
            "forest_area_sqm": forest_area,
            "estimated_number_of_trees": floor(number_of_trees),
            "estimated_carbon_absorption_metric_tons": carbon_absorption
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))