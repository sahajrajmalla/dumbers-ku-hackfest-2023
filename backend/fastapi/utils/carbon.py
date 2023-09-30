from utils.utils import top_n_nearest_rows

import pandas as pd

def get_avg_transport_carbon_emission(lat, lon):
    n = 10
    dataset = pd.read_csv("data/carbon.csv")
    top_n = top_n_nearest_rows(lat, lon, n, dataset)
    avg_emission = sum([row["emission_(co2e)"] for row in top_n]) / len(top_n)
    return avg_emission


def get_avg_project_carbon_emission(lat, lon):
    n = 10
    dataset = pd.read_csv("data/project_carbon.csv")
    top_n = top_n_nearest_rows(lat, lon, n, dataset)
    avg_emission = sum([row["emission_(co2e)"] for row in top_n]) / len(top_n)
    return avg_emission

def get_avg_supply_carbon_emission(lat, lon):
    n = 10
    dataset = pd.read_csv("data/supply.csv")
    top_n = top_n_nearest_rows(lat, lon, n, dataset)
    avg_emission = sum([row["emission_(co2e)"] for row in top_n]) / len(top_n)
    return avg_emission