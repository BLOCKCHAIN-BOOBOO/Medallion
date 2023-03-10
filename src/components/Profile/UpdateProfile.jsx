import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import { GetUserInfo, UpdateUserProfile } from "../../Utils/Methods";
import { UserLoggedIn } from "../../store/UserAuthenticationReducer";

function UpdateProfile() {
  const Token = useSelector((state) => state.user.token);
  const [UserInfo, SetUserInfo] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const [active,setActive]=useState(false);
  let messagesEndRef = useRef();
  let ref2 = useRef(null);
  const dispatch = useDispatch();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      await UpdateUserProfile(
        UserInfo.first_name,
        UserInfo.last_name,
        UserInfo.email,
        Token
      );
      toast.success("Profile Updated Successfully");
      await HandleGetUserInfo(Token);
    } catch (error) {
      toast.error(error);
    } finally {
      SetLoading(false);
    }
  };

  const HandleGetUserInfo = async (Token) => {
    SetLoading(true);
    // const id = toast.loading("Getting Profile Data");
    try {
      const UserInfoResponse = await GetUserInfo(Token);
      SetUserInfo(UserInfoResponse);
      await  dispatch({
            type: UserLoggedIn,
            payload: {
              email: UserInfoResponse.email,
              first_name: UserInfoResponse.first_name,
              last_name: UserInfoResponse.last_name,
              token: Token,
            },
          });
    } catch (error) {
      toast.error(error);
    } finally {
      SetLoading(false);
      // toast.update(id, {
      //   render: "Profile Data Loaded Successfully",
      //   type: "success",
      //   isLoading: false,
      // });
    }
  };

  // const scrollToBottom = () => {
  //   messagesEndRef?.current?.scrollIntoView({ behavior: "auto" });
  // };
  function scrollTo(ref) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" },3000);
  }
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  useEffect(() => {
    HandleGetUserInfo(Token);
  }, [Token]);
  useEffect(()=>{
    scrollTo(ref2);
  },[])

  return (
    <div className="flex flex-col">
      {/* w-full login-card  */}
      <ToastContainer />
      <div className="self-center">
        {Loading && <ReactLoading type="bars" color="#fff" />}
      </div>

      {!Loading && UserInfo && (
        <div className="p-6 self-center md:p-8 text-left">
          <div className="flex flex-col">
            <h3 className="dashboard-tab-header mb-5 xl:self-start md:self-start sm:self-start self-center">
              Update Profile
            </h3>
            <form
              method="post"
              onSubmit={SubmitHandler}
              className="self-center text-center"
            >
              <div className="flex m-2 xl:flex-row md:flex-row sm:flex-col flex-col">
              <label className="block m-4 self-center">
                <span className="input-label after:content-[''] after:ml-0.5 after:text-red-500 block text-left 
                text-sm text-gray-500 font-medium">
                  First Name
                </span>
                <input
                  type="text"
                  className="login-input mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border focus:outline-none
                   focus:border-sky-500 focus:ring-sky-500 block dashboard-input-width w-64 rounded-3xl input-background sm:text-sm 
                   focus:ring"
                  value={UserInfo.first_name}
                  required
                  onChange={(e) =>
                    SetUserInfo({ ...UserInfo, first_name: e.target.value })
                  }
                />
              </label>

              <label className="block m-4 self-center">
                <span className="input-label after:content-[''] after:ml-0.5 after:text-red-500 block text-left text-sm 
                text-gray-500 font-medium">
                  Last Name
                </span>
                <input
                  type="text"
                  className="login-input mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border focus:outline-none
                   focus:border-sky-500 focus:ring-sky-500 block dashboard-input-width w-64 rounded-3xl input-background sm:text-sm focus:ring"
                  value={UserInfo.last_name}
                  required
                  onChange={(e) =>
                    SetUserInfo({ ...UserInfo, last_name: e.target.value })
                  }
                />
              </label>
              </div>
              <div className="flex xl:float-right md:float-right sm:self-center self-center m-6">
              <button disabled={UserInfo.last_name!=="" && UserInfo.first_name!==""?false:true} 
              // className=" inactive-button px-10 py-2"
              className={`px-10 py-2 ${
                UserInfo.last_name!=="" && UserInfo.first_name!==""? "active-button" : "inactive-button"
              }`}
              >
                Update
              </button>
              </div>
              <div id="componentToScrollTo"  ref={ref2}></div>
            </form>
            <div  />
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
