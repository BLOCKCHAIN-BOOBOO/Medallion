let ResponseObject = {
  status_code: null,
  status_message: null,
  message: null,
};
const ErrorHandler = (result) => {
  try {
    ResponseObject.status_code = result.status;
    ResponseObject.status_message = result.data.data.code;
    ResponseObject.message = result.data.data.message;
    return ResponseObject;
  } catch (error) {
    ResponseObject.status_code = "failed";
    ResponseObject.message = error.message;
    throw ResponseObject;
  }
};

export default ErrorHandler;
