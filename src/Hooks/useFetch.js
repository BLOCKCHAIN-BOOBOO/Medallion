import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, token) => {
  const [Data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data.data.records;
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, token]);
  return { Data, Loading, Error };
};

export default useFetch;
