import useFetch from "@/hooks/useFetch.js";
import React from "react";

function stats() {
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

  console.log("airPolutionData", airPolutionData);
  console.log("waterPolutionData", waterPolutionData);

  return <div className="h-[100vh]">stats</div>;
}

export default stats;
