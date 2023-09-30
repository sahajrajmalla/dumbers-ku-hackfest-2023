from utils.utils import top_n_nearest_rows

import pandas as pd

def get_avg_noise(lat, lon):
    n = 10
    dataset = pd.read_csv("data/noise.csv")
    top_n = top_n_nearest_rows(lat, lon, n, dataset)
    avg_noise_level = sum([row["noise_level_(db)"] for row in top_n]) / len(top_n)
    return avg_noise_level