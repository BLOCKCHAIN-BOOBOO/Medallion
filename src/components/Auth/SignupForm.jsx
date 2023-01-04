import { useState } from "react";
import { SignUp } from "./Signup";
import { Link } from "react-router-dom";
import AlertHandler from "../common/AlertHandler";
import { useForm } from "react-hook-form";
import HandleError from "../common/HandleError";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";


function SignupForm() {
  const [Loading, SetLoading] = useState(false);
  const [ShowContent, SetShowContent] = useState(true);
  const [Status, SetStatus] = useState(false);
  const [AddContent, SetAddContent] = useState(null);
  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Email, SetEmail] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    SetLoading(true);
    const { result, RequestResolved } = await SignUp(data);
    if (RequestResolved) {
      const { ShowContent, ResultType, Message } = HandleError(result);
      SetLoading(false);
      SetStatus(<AlertHandler status={ResultType} status_message={Message} />);
      SetShowContent(ShowContent);

      if (ResultType==="success" && !ShowContent) {
        navigate("/login")
       
      }
    }
  };

  let Content = (
    <div className="buy-card lg:w-2/5 p-6 self-center md:p-8 text-left">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold mb-5 self-center">Sign Up</h3>
        <form className="self-center" onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-5 self-center">
            <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-left text-sm text-gray-500 font-medium">
              First Name
            </span>
            <input
              type="text"
              className="mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border placeholder-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 block dashboard-input-width w-64 rounded-3xl input-background sm:text-sm focus:ring"
              placeholder="Enter First Name"
              value={FirstName}
              {...register("first_name", {
                required: true,
                onChange: (e) => SetFirstName(e.target.value.toUpperCase()),
              })}
            />
            {errors.first_name && (
              <span className="text-red-500">This Field is required</span>
            )}
          </label>

          <label className="block mb-5 self-center">
            <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-sm text-left text-gray-500 font-medium">
              Last Name
            </span>
            <input
              className="mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border placeholder-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 dashboard-input-width rounded-3xl input-background sm:text-sm focus:ring"
              type="text"
              placeholder="Enter Last name"
              value={LastName}
              {...register("last_name", {
                required: true,
                onChange: (e) => SetLastName(e.target.value.toUpperCase()),
              })}
            />
            {errors.last_name && (
              <span className="text-red-500">This Field is required</span>
            )}
          </label>

          <label className="block mb-5 self-center">
            <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-sm text-left text-gray-500 font-medium">
              Email
            </span>
            <input
              className="mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border placeholder-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 dashboard-input-width rounded-3xl input-background sm:text-sm focus:ring"
              type="email"
              placeholder="Enter Email"
              value={Email}
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                onChange: (e) => SetEmail(e.target.value.toLowerCase()),
              })}
            />
            {errors.email?.type === "pattern" && (
              <span className="text-red-500">
                Please Enter Valid Email Address
              </span>
            )}
          </label>

          <label className="block mb-5 self-center">
            <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-sm text-left text-gray-500 font-medium">
              Password
            </span>
            <input
              type="password"
              className="mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border placeholder-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 dashboard-input-width rounded-3xl input-background sm:text-sm focus:ring"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Min length is 6",
                },
              })}
            />
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Minimum 6 characters required
              </span>
            )}
          </label>

          {/* <label className="block mb-5 self-center">
        <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-sm text-left text-gray-500 font-medium">
          Comfirm Password
        </span>
        <input
          type="email"
          name="email"
          className="mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border-1 placeholder-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 dashboard-input-width rounded-3xl input-background sm:text-sm focus:ring"
          placeholder=""
        />
      </label> */}

          <div className="mb-5 mt-5 self-center text-center">
            <button className="text-white rounded-3xl bg-indigo-800 text-xs font-bold px-10 py-2 rounded-full">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="market-section-color">
      <section
        className="market-background relative pt-10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 pb-20"
        // style={{ minHeight: "400px" }}
      >
        <div className="container mx-auto align">
          <div className="w-full flex flex-col">
            <div className="self-center">
              {Loading ? <ReactLoading type="bars" color="#fff" /> : Status}
              {AddContent && AddContent}
            </div>
            {ShowContent && Content}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignupForm;
