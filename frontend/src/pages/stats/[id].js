import useFetch from "@/hooks/useFetch.js";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation.js";
import React, { useEffect, useState } from "react";
import CardOne from "@/components/Cards/CardOne.js";
import CardTwo from "@/components/Cards/CardTwo.js";
import CardThree from "@/components/Cards/CardThree.js";
import CardFour from "@/components/Cards/CardFour.js";
import ChartOne from "@/components/charts/ChartOne.js";
import ChartTwo from "@/components/charts/ChartTwo.js";
import ChartThree from "@/components/charts/chartThree.js";
import api from "@/utils/api.js";

function stats() {
  const router = useRouter();
  const { id } = router.query;

  const [forestData, setForestData] = useState(null);

  const {
    data: singleProjectData,
    isPending: singleFeching,
    error: singleDataError,
  } = useFetch(`/projects/${id}`);

  const project_type = singleProjectData && singleProjectData.project_type;
  const polygon_coordinates =
    singleProjectData && singleProjectData.polygon_coordinates;

  console.log(polygon_coordinates);

  console.log("project_type", project_type);

  const {
    data: airPolutionData,
    isPending: airPolutionIsPending,
    error: airPolutionError,
  } = useFetch(`/air_pollution/?type=${project_type}`);

  const {
    data: waterPolutionData,
    isPending: waterPolutionIsPending,
    error: waterPolutionError,
  } = useFetch(`/water_pollution/?type=${project_type}`);

  const {
    data: metricForLatLangData,
    isPending: metricForLatLangIsPending,
    error: metricForLatLangError,
  } = useFetch(
    `/get_metrics_for_lat_lng/?lat=${
      polygon_coordinates && polygon_coordinates[0][0]
    }&lon=${polygon_coordinates && polygon_coordinates[0][1]}`
  );

  const {
    data: developmentEnergyData,
    isPending: developmentEnergyIsPending,
    error: developmentEnergyError,
  } = useFetch("/development_energy/?type=airport");

  const getplyData = async (info) => {
    // debugger;
    await api
      .post("/calculate_forest_metrics", {
        polygon: info,
      })
      .then((value) => {
        console.log("____Value", value.data);
        setForestData(value.data);
      });
  };
  useEffect(() => {
    if (!polygon_coordinates) return;
    getplyData(polygon_coordinates && polygon_coordinates);
  }, [polygon_coordinates]);

  // console.log("airPolutionData", airPolutionData);
  // console.log("waterPolutionData", waterPolutionData);
  // console.log("metricForLatLang", metricForLatLangData);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
        {metricForLatLangData && (
          <>
            <div className="grid grid-cols-1 mb-7 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
              <CatWidget
                value={metricForLatLangData.avg_area}
                title={"Avg Area"}
              />
              <CatWidget
                value={metricForLatLangData.avg_nearby_facilities}
                title={"avg_nearby_facilities"}
              />
              <CatWidget
                value={Math.round(
                  metricForLatLangData.avg_proximity_to_city_center,
                  3
                )}
                title={"avg_proximity_to_city_center"}
              />
              <CatWidget
                value={metricForLatLangData.avg_waste_amount_ton}
                title={"avg_waste_amount_ton"}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7 mb-7">
              <CatWidget
                value={metricForLatLangData["noise_level_(db)"]}
                title={"noise_level_(db)"}
              />
              <CatWidget
                value={metricForLatLangData.organism_count}
                title={"organism_count"}
              />
              <CatWidget
                value={metricForLatLangData["project_emission_(co2e)"]}
                title={"project_emission_(co2e)"}
              />
              <CatWidget
                value={Math.round(
                  metricForLatLangData["supply_emission_(co2e)"],
                  3
                )}
                title={"supply_emission_(co2e)"}
              />
            </div>
          </>
        )}

        {forestData &&
          airPolutionData &&
          waterPolutionData &&
          developmentEnergyData &&
          metricForLatLangData && (
            <ChartThree
              devData={developmentEnergyData}
              airData={airPolutionData}
              waterData={waterPolutionData}
              metricsData={metricForLatLangData}
              forData={forestData}
            />
          )}

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
          {/* <ChartOne /> */}
          {airPolutionData && (
            <ChartTwo
              title={"Air Pollution Index"}
              airQualityData={airPolutionData}
            />
          )}
          {waterPolutionData && (
            <ChartTwo
              title={"Water Pollution Index"}
              airQualityData={waterPolutionData}
            />
          )}
          {developmentEnergyData && (
            <ChartTwo
              title={"Development Energy Data"}
              airQualityData={developmentEnergyData}
            />
          )}

          {forestData && (
            <ChartTwo title={"Forestry Data"} airQualityData={forestData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default stats;

const CatWidget = ({ title, value }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {value}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};
