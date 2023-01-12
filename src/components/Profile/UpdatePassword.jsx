import { useState } from "react";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import { UpdateUserPassword } from "../../Utils/Methods";

function UpdatePassword() {
  const token = useSelector((state) => state.user.token);
  const [Loading, SetLoading] = useState(false);
  const [CurrentPassword, SetCurrentPassword] = useState(null);
  const [NewPassword, SetNewPassword] = useState(null);
  const [FormVisible, SetFormVisible] = useState(true);   
  const [newshowconfirm, setshowconfirm] = useState(false);
  const [currentshowconfirm, setcurrentshowconfirm] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      const resp=  await UpdateUserPassword(CurrentPassword, NewPassword, token);
      if(resp?.data?.code==="failed"){
        toast.error(resp?.data?.message);
      }
      else{
         toast.success(resp?.data?.message);
      }
      // toast.success("Password Updated Successfully");
      // SetFormVisible(false);
    } catch (error) {
      console.log("Update Password Error", error);
      toast.error(error);
      
      // SetFormVisible(true);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* w-full  */}
      <ToastContainer />
      <div className="self-center">
        {Loading && <ReactLoading type="bars" color="#fff" />}
      </div>

      {FormVisible && (
        <div className=" p-6 self-center md:p-8 text-left">
          <div className="flex flex-col">
            <h3 className="dashboard-tab-header mb-5 xl:self-start md:self-start sm:self-start self-center">
              {/* mb-10 */}
              Change Password
            </h3>
            <form
              method="post"
              onSubmit={SubmitHandler}
              className="self-center text-center"
            >
                <div className="flex m-2 xl:flex-row md:flex-row sm:flex-col flex-col">
              <label className="block m-4 self-center">
                <span className="input-label after:content-[''] after:ml-0.5 after:text-red-500 block text-left text-sm text-gray-500 font-medium">
                  Current Password
                </span>
                <input
                  type={currentshowconfirm ? "text" : "password"}
                  className="login-input mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border focus:outline-none focus:border-sky-500 focus:ring-sky-500 block dashboard-input-width w-64 rounded-3xl input-background sm:text-sm focus:ring"
                  required
                  onChange={(e) => SetCurrentPassword(e.target.value)}
                />
                {currentshowconfirm ? (
                <i className="fa fa-eye float-right -mt-6 mr-2 cursor-pointer"  onClick={(e) => setcurrentshowconfirm(false)}></i>
              ) : (
                <i className="fa fa-eye-slash float-right -mt-6 mr-2 cursor-pointer"  onClick={(e) => setcurrentshowconfirm(true)}></i>
              )}

              </label>

              <label className="block m-4 self-center">
                <span className="input-label nafter:content-[''] after:ml-0.5 after:text-red-500 block text-left text-sm text-gray-500 font-medium">
                  New Password
                </span>
                <input
                  type={newshowconfirm ? "text" : "password"}
                  className="login-input mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border focus:outline-none focus:border-sky-500 focus:ring-sky-500 block dashboard-input-width w-64 rounded-3xl input-background sm:text-sm focus:ring"
                  required
                  onChange={(e) => SetNewPassword(e.target.value)}
                />
                {newshowconfirm ? (
                <i className="fa fa-eye float-right -mt-6 mr-2 cursor-pointer"  onClick={(e) => setshowconfirm(false)}></i>
              ) : (
                <i className="fa fa-eye-slash float-right -mt-6 mr-2 cursor-pointer"  onClick={(e) => setshowconfirm(true)}></i>
              )}

              </label>
              </div>
               <div className="flex xl:float-right md:float-right sm:self-center self-center m-6">
              <button  disabled={CurrentPassword&&NewPassword?false:true} 
              // className="inactive-button px-10 py-2"
              
              className={`px-10 py-2 ${
                CurrentPassword&&NewPassword? "active-button" : "inactive-button"
              }`}
              
              >
                Update Password
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
