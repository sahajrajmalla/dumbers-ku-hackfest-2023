import osmnx as ox
from fastapi import FastAPI, HTTPException, Body
from shapely.geometry import Polygon
from math import floor
from typing import List, Tuple
from pydantic import BaseModel, Field
import json
import redis
import pandas as pd
from utils.utils import haversine, top_n_nearest_rows
from utils.forest import calculate_forest_area, estimate_number_of_trees, estimate_carbon_absorption
from utils.land import calculate_land_averages
from utils.waste import get_avg_waste
from utils.noise import get_avg_noise
from utils.carbon import get_avg_transport_carbon_emission, get_avg_project_carbon_emission, get_avg_supply_carbon_emission
from utils.organism import get_avg_organism_count

# Constants
HECTARE_TO_SQ_M = 10000  # 1 hectare = 10,000 square meters

# Create a Redis connection
redis_conn = redis.Redis(host='localhost', port=6379, db=0)


# Create a FastAPI app
app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}




@app.get("/get_metrics_for_lat_lng")
def get_metrics_for_lat_lng(lat: float, lon: float):
    n = 10
    land_prices = pd.read_csv('data/land.csv')
    # Assuming land_prices is a DataFrame
    top_n = top_n_nearest_rows(lat, lon, n, land_prices)
    
    summary_n = calculate_land_averages(top_n)
    
    
    summary_n["avg_waste_amount_ton"] = get_avg_waste(lat, lon)
    summary_n["noise_level_(db)"] = get_avg_noise(lat, lon)
    summary_n["transport_emission_(co2e)"] = get_avg_transport_carbon_emission(lat, lon)
    summary_n["project_emission_(co2e)"] = get_avg_project_carbon_emission(lat, lon)
    summary_n["supply_emission_(co2e)"] = get_avg_supply_carbon_emission(lat, lon)
    summary_n["organism_count"] = int(get_avg_organism_count(lat, lon))

    return summary_n


@app.get("/water_pollution")
def get_water_pollution():
    # Read the JSON file
    with open("data/water_pollution.json", "r") as json_file:
        water_pollution = json.load(json_file)
        
    return water_pollution



@app.get("/air_pollution")
def get_air_pollution():
    # Read the JSON file
    with open("data/air_pollution.json", "r") as json_file:
        air_pollution = json.load(json_file)
        
    return air_pollution



@app.get("/development_energy")
def get_development_energy():
    # Read the JSON file
    with open("data/development_energy.json", "r") as json_file:
        development_energy = json.load(json_file)
        
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

@app.post("/calculate_forest_metrics")
async def calculate_forest_metrics(request_data: PolygonRequestModel):
    try:
        # Extract the list of coordinates from the request model
        polygon = request_data.polygon

        # Convert the list of tuples into a Shapely Polygon
        shapely_polygon = Polygon(polygon)

        # Generate a unique key for this request
        polygon_key = str(polygon)

        # Try fetching the result from Redis cache
        cached_result = redis_conn.get(polygon_key)
        if cached_result:
            # If cached result exists, return it
            return json.loads(cached_result)

        # If result is not cached, proceed to calculate the metrics
        forest_area = calculate_forest_area(shapely_polygon)
        number_of_trees = estimate_number_of_trees(forest_area)
        carbon_absorption = estimate_carbon_absorption(forest_area)

        # Prepare the result
        result = {
            "forest_area_sqm": forest_area,
            "estimated_number_of_trees": floor(number_of_trees),
            "estimated_carbon_absorption_metric_tons": carbon_absorption
        }

        # Cache the result in Redis
        redis_conn.set(polygon_key, json.dumps(result))

        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))