import axios from "axios";
import { BASE_URL, USER_SIGNIN_URL } from "../../api";

export const SignIn = async (data) => {
  const UserSignInUrl = BASE_URL + USER_SIGNIN_URL;
  let RequestResolved = false;

  //Coverting case
  const ValidatedData = {
    email: data.email.toLowerCase(),
  };

  const form_data = new FormData();
  form_data.append("email", ValidatedData.email);
  form_data.append("password", data.password);

  const result = await axios({
    method: "post",
    url: UserSignInUrl,
    data: form_data,
    headers: { "Content-Type": "application/json" },
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
