import axios from "axios";

const GetFunction = async (GetUrl, Token) => {
  let RequestResolved = false;
  const result = await axios({
    method: "get",
    url: GetUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    })
    .finally(() => {
      RequestResolved = true;
    });
  return { result, RequestResolved };
};

export default GetFunction;
