import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const weights = {
  forest_area_sqm: 0.05,
  estimated_number_of_trees: 0.05,
  estimated_carbon_absorption_metric_tons: 0.1,
  avg_price: 0.05,
  avg_proximity_to_city_center: 0.05,
  avg_nearby_facilities: 0.05,
  avg_area: 0.05,
  avg_price_per_sq_area: 0.05,
  avg_waste_amount_ton: 0.05,
  "noise_level_(db)": 0.05,
  "transport_emission_(co2e)": 0.05,
  "project_emission_(co2e)": 0.05,
  "supply_emission_(co2e)": 0.05,
  organism_count: 0.05,
  "density_(projects/km²)": 0.05,
  pollution_index: 0.05,
  pollution_density: 0.05,
  "pm2.5_(μg/m³)": 0.05,
  "pm10_(μg/m³)": 0.05,
  "no2_(ppb)": 0.05,
  "tenure_(years)": 0.05,
  "size_(1-10)": 0.05,
  "energy_type_(1-renewable,_0-non-renewable)": 0.05,
  "energy_consumption_(units)": 0.05,
};

function scale(x, inputMin, inputMax, outputMin = 1, outputMax = 100) {
  return (
    ((x - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin
  );
}

function normalizeNumber(number, min = 0, max = 1) {
  if (number < min) return 0;
  if (number > max) return 1;
  return (number - min) / (max - min);
}

const combineData = (airData, forData, devData, waterData, metricsData) => {
  return {
    forest_area_sqm: forData.forest_area_sqm,
    estimated_number_of_trees: forData.estimated_number_of_trees,
    estimated_carbon_absorption_metric_tons:
      forData.estimated_carbon_absorption_metric_tons,
    avg_price: metricsData.avg_price,
    avg_proximity_to_city_center: metricsData.avg_proximity_to_city_center,
    avg_nearby_facilities: metricsData.avg_nearby_facilities,
    avg_area: metricsData.avg_area,
    avg_price_per_sq_area: metricsData.avg_price_per_sq_area,
    avg_waste_amount_ton: metricsData.avg_waste_amount_ton,
    "noise_level_(db)": metricsData["noise_level_(db)"],
    "transport_emission_(co2e)": metricsData["transport_emission_(co2e)"],
    "project_emission_(co2e)": metricsData["project_emission_(co2e)"],
    "supply_emission_(co2e)": metricsData["supply_emission_(co2e)"],
    organism_count: metricsData["organism_count"],
    "density_(projects/km²)": waterData["density_(projects/km²)"],
    pollution_index: waterData.pollution_index,
    pollution_density: waterData.pollution_density,
    "pm2.5_(μg/m³)": airData["pm2.5_(μg/m³)"],
    "pm10_(μg/m³)": airData["pm10_(μg/m³)"],
    "no2_(ppb)": airData["no2_(ppb)"],
    "tenure_(years)": devData["tenure_(years)"],
    "size_(1-10)": devData["size_(1-10)"],
    "energy_type_(1-renewable,_0-non-renewable)":
      devData["energy_type_(1-renewable,_0-non-renewable)"],
    "energy_consumption_(units)": devData["energy_consumption_(units)"],
  };
};

const data = (airData, forData, devData, waterData, metricsData) => {
  const myData = combineData(airData, forData, devData, waterData, metricsData);
  let weightedAverage = 0;

  for (let key in myData) {
    if (weights.hasOwnProperty(key)) {
      weightedAverage += normalizeNumber(Number(myData[key])) * weights[key];
    }
  }

  return Math.ceil(weightedAverage);
};

const segmentData = (data) => {
  let clusters = {
    "Environmental Impact": [
      data["forest_area_sqm"],
      data["estimated_number_of_trees"],
      data["estimated_carbon_absorption_metric_tons"],
      data["organism_count"],
    ],
    Emissions: [
      data["transport_emission_(co2e)"],
      data["project_emission_(co2e)"],
      data["supply_emission_(co2e)"],
    ],
    Pollution: [
      data["pollution_index"],
      data["pollution_density"],
      data["pm2.5_(μg/m³)"],
      data["pm10_(μg/m³)"],
      data["no2_(ppb)"],
    ],
    "Project Details": [
      data["avg_price"],
      data["avg_area"],
      data["avg_price_per_sq_area"],
      data["tenure_(years)"],
      data["size_(1-10)"],
      data["energy_type_(1-renewable,_0-non-renewable)"],
      data["energy_consumption_(units)"],
    ],
    "Community and Location": [
      data["avg_proximity_to_city_center"],
      data["avg_nearby_facilities"],
      data["density_(projects/km²)"],
    ],
    "Waste and Noise": [data["avg_waste_amount_ton"], data["noise_level_(db)"]],
  };

  let clusterSums = {};

  for (let cluster in clusters) {
    clusterSums[cluster] = clusters[cluster].reduce((a, b) => a + b, 0);
  }

  return clusterSums;
};

const options = (segData) => {
  return {
    chart: {
      type: "donut",
    },
    colors: ["#10B981", "#375E83", "#259AE6", "#FFA70B"],
    labels: Object.keys(segData),
    legend: {
      show: true,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
};

const ChartThree = ({ airData, forData, devData, waterData, metricsData }) => {
  const myData = data(airData, forData, devData, waterData, metricsData);
  const segmenData = segmentData(
    combineData(airData, forData, devData, waterData, metricsData)
  );
  const [state, setState] = useState({
    series: Object.values(segmenData),
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Pulse Index
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <div className="relative ">
            <ReactApexChart
              options={options(segmenData)}
              series={state.series}
              type="donut"
            />
          </div>
          <div className="absolute text-3xl mt-24 ">{myData}</div>
        </div>
      </div>

      {/* <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Desktop </span>
              <span> 65% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Tablet </span>
              <span> 34% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Mobile </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Unknown </span>
              <span> 12% </span>
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ChartThree;
