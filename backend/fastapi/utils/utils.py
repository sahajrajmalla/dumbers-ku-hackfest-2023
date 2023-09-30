

import math

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance in kilometers between two points on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    # haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371  # Radius of Earth in kilometers. Use 3956 for miles
    return c * r


def top_n_nearest_rows(lat, lon, n, dataset):
    """
    Find the top n nearest rows in the dataset to the given lat and lon.
    
    :param lat: latitude of the point to compare
    :param lon: longitude of the point to compare
    :param n: number of nearest points to find
    :param dataset: dataset containing latitude and longitude
    :return: list of top n nearest rows from the dataset
    """
    distances = []

    for index, row in dataset.iterrows():  # if dataset is a DataFrame
        item_lat, item_lon = float(row["latitude"]), float(row["longitude"])
        distance = haversine(lat, lon, item_lat, item_lon)
        distances.append((distance, row.to_dict()))  # storing the entire row as a dictionary
    
    # Sort the distances list and take the top n items
    distances.sort()
    top_n = distances[:n]
    
    # Extract only the row from top_n for the final result
    result = [row for dist, row in top_n]
    
    return result