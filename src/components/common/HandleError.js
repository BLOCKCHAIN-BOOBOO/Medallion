const HandleError = (result) => {
  console.log(result);
  let { ShowContent, ResultType, Message } = "";
  if (
    result.status
      ? result.status
      : result.data.status === 200 && result.data.code === "success"
  ) {
    Message = result.data.message ? result.data.message : result.message;
    ShowContent = false;
    ResultType = "success";
    return { ShowContent, ResultType, Message };
  } else {
    Message =
      result.response && result.response.data.message
        ? result.response.data.message
        : result.data.message;

    ShowContent = true;
    ResultType = "danger";
    return { ShowContent, ResultType, Message };
  }
};

export default HandleError;
