from utils.utils import top_n_nearest_rows

import pandas as pd

def get_avg_waste(lat, lon):
    n = 10
    dataset = pd.read_csv("data/waste_generation.csv")
    top_n = top_n_nearest_rows(lat, lon, n, dataset)
    avg_waste_amount_ton = sum([row["waste_amount_(ton)"] for row in top_n]) / len(top_n)
    return avg_waste_amount_ton