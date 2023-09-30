from utils.utils import top_n_nearest_rows

import pandas as pd

def get_avg_organism_count(lat, lon):
    n = 10
    dataset = pd.read_csv("data/organism.csv")
    top_n = top_n_nearest_rows(lat, lon, n, dataset)
    avg_org_count = sum([row["population_size"] for row in top_n]) / len(top_n)
    return avg_org_count