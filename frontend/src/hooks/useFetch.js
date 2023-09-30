import api from "@/utils/api.js";
import { useState, useEffect } from "react";

const useFetch = (url, dependencyArray = []) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(url)
      .then((res) => {
        setData(res.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        setError(err.message);
      });
  }, [url, ...dependencyArray]);

  return { data, isPending, error };
};

export default useFetch;
