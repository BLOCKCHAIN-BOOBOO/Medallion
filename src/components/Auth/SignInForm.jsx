import { useState } from "react";
import { SignIn } from "./SignIn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLoggedIn } from "../../store/UserAuthenticationReducer";
import { useForm } from "react-hook-form";
import AlertHandler from "../common/AlertHandler";
import HandleError from "../common/HandleError";
import ReactLoading from "react-loading";

function SigninForm() {
  const [Status, SetStatus] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const [Email, SetEmail] = useState("");  
  const [showconfirm, setshowconfirm] = useState(false);

  let Content = "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    SetLoading(true);
    const { result, RequestResolved } = await SignIn(data);
    if (RequestResolved) {
      SetLoading(false);
      if (result.status === 200 && result.data.data) {
        const data = result.data.data;
        if (data.token) {
          const String = JSON.stringify({
            token: data.token,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
          });
          sessionStorage.setItem("princess_store", String); //Local Storage
          //Dispatching Action
          dispatch({
            type: UserLoggedIn,
            payload: {
              token: data.token,
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
            },
          });
          navigate("/collection");
        }
      }
      const { ResultType, Message } = HandleError(result);
      SetStatus(<AlertHandler status={ResultType} status_message={Message} />);
    }
  };

  Content = (
    <div className="login-card p-6 self-center md:p-8 text-left">
      {/* buy-card */}
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold mb-10 self-center login-text ">Log in</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="self-center">
          <label className="block mb-5 self-center">
            <span className="input-label after:content-[''] after:ml-0.5 after:text-red-500 block 
            text-left text-sm text-gray-500 font-medium">
              E-mail Id
            </span>
            <input
              type="email"
              className="mt-1 login-input  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block
                dashboard-input-width w-64 input-background focus:ring"
              placeholder="Enter Username"
              required
              value={Email}
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                onChange: (e) => SetEmail(e.target.value.toLowerCase()),
              })}
            />
            {errors.email?.type === "pattern" && (
              <span className="wrong-text">
                Please Enter Valid Email Address
              </span>
            )}
          </label>

          <label className="block mb-5 self-center">
            <span className="input-label after:content-[''] after:ml-0.5 after:text-red-500 block text-sm text-left text-gray-500 font-medium">
              Password
            </span>
            <input
              type={showconfirm ? "text" : "password"}
              required
              className="mt-1 login-input focus:outline-none focus:border-sky-500 focus:ring-sky-500 
              block w-64 dashboard-input-width  input-background sm:text-sm focus:ring"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
{showconfirm ? (
                <i className="fa fa-eye float-right -mt-6 mr-2 cursor-pointer"  onClick={(e) => setshowconfirm(false)}></i>
              ) : (
                <i className="fa fa-eye-slash float-right -mt-9 mr-2 cursor-pointer"  onClick={(e) => setshowconfirm(true)}></i>
              )}


           
            
            {errors.password && (
              <span className="wrong-text">This Field is required</span>
            )}
          </label>

          <div className="mb-10 mt-5 self-center lg:self-center text-center">
            <button
              // className="inactive-button"

          className={Loading ? "active-button" : "inactive-button"}

              disabled={Loading ? true : false}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="market-section-color">
      <section
      // market-background 
        className="market-background fixed  pt-10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 "
        // style={{ minHeight: "660px" }}
      >
        <div className="container mx-auto align">
          <div className="w-full flex flex-col">
            <div className="self-center">
              {Loading ? <ReactLoading type="bars" color="#fff" /> : Status}
            </div>
            {Content && Content}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SigninForm;
