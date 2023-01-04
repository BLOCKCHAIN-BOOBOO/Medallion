import axios from "axios";
import { BASE_URL, USER_SIGNUP_URL } from "./../../api";

export const SignUp = async (Data) => {
  const UserSignupUrl = BASE_URL + USER_SIGNUP_URL;
  let RequestResolved = false;

  //Coverting case
  const ValidatedData = {
    first_name: Data.first_name.toUpperCase(),
    last_name: Data.last_name.toUpperCase(),
    email: Data.email.toLowerCase(),
  };

  const form_data = new FormData();
  form_data.append("first_name", ValidatedData.first_name);
  form_data.append("last_name", ValidatedData.last_name);
  form_data.append("email", ValidatedData.email);
  form_data.append("password", Data.password);

  const result = await axios({
    url: UserSignupUrl,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: form_data,
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
