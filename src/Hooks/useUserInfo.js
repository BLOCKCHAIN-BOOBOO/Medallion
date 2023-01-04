import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, USER_INFO } from "../api";

const useUserInfo = (token) => {
  const [DataObject, SetDataObject] = useState(null);
  const [ErrorObject, SetErrorObject] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: BASE_URL + USER_INFO,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }, [token]);

  return { DataObject, ErrorObject };
};

export default useUserInfo;
