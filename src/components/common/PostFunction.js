import axios from "axios";

const PostFunction = async (GetUrl, Data, Token) => {
  let RequestResolved = false;
  const result = await axios({
    method: "post",
    url: GetUrl,
    data: Data,
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

export default PostFunction;
