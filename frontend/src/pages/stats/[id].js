import useFetch from "@/hooks/useFetch.js";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation.js";
import React, { useEffect } from "react";
import CardOne from "@/components/Cards/CardOne.js";
import CardTwo from "@/components/Cards/CardTwo.js";
import CardThree from "@/components/Cards/CardThree.js";
import CardFour from "@/components/Cards/CardFour.js";
import ChartOne from "@/components/charts/ChartOne.js";
import ChartTwo from "@/components/charts/ChartTwo.js";
import ChartThree from "@/components/charts/chartThree.js";

function stats() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: singleProjectData,
    isPending: singleFeching,
    error: singleDataError,
  } = useFetch(`/projects/${id}`);
  // TODO: fetch assessment using assessment ID and send assessment type to the
  // backend to get the data for the specific assessment type

  const {
    data: airPolutionData,
    isPending: airPolutionIsPending,
    error: airPolutionError,
  } = useFetch("/air_pollution/?type=airport");

  const {
    data: waterPolutionData,
    isPending: waterPolutionIsPending,
    error: waterPolutionError,
  } = useFetch("/water_pollution/?type=airport");

  const {
    data: metricForLatLangData,
    isPending: metricForLatLangIsPending,
    error: metricForLatLangError,
  } = useFetch("/get_metrics_for_lat_lng/?lat=12.9716&lon=77.5946");

  const {
    data: developmentEnergyData,
    isPending: developmentEnergyIsPending,
    error: developmentEnergyError,
  } = useFetch("/development_energy/?type=airport");

  console.log("airPolutionData", airPolutionData);
  console.log("waterPolutionData", waterPolutionData);
  console.log("metricForLatLang", metricForLatLangData);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
          <CardOne />
          <CardTwo />
          <CardThree />
          <CardFour />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
          <ChartOne />
          <ChartTwo />
          <ChartThree />
        </div>
      </div>
    </div>
  );
}

export default stats;
