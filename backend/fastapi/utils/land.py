
from math import floor

def calculate_land_averages(data):
    avg_price = 0
    avg_proximity_to_city_center = 0
    avg_nearby_facilities = 0
    avg_area = 0
    avg_price_per_sq_area = 0
    count = len(data)

    for item in data:
        avg_price += item["price_($)"]
        avg_proximity_to_city_center += item["proximity_to_city_center_(km)"]
        avg_nearby_facilities += item["nearby_facilities"]
        avg_area += item["area_(sq.m.)"]
        avg_price_per_sq_area += item["price_($)"] / item["area_(sq.m.)"]

    # Calculating the averages
    avg_price /= count
    avg_proximity_to_city_center /= count
    avg_nearby_facilities /= count
    avg_area /= count
    avg_price_per_sq_area /= count

    # Constructing the result dictionary
    result = {
        "avg_price": avg_price,
        "avg_proximity_to_city_center": avg_proximity_to_city_center,
        "avg_nearby_facilities": floor(avg_nearby_facilities),
        "avg_area": avg_area,
        "avg_price_per_sq_area": avg_price_per_sq_area
    }

    return result
