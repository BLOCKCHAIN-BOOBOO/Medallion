import { useSelector } from "react-redux";
import DefaultAvatar from "./../../theme/images/avatar.png";
import { FormatUsername } from "../../Utils/Helper";
import { useEffect } from "react";
import { GetUserInfo } from "../../Utils/Methods";
import copy from "./../../theme/images/copy.png";
import { useState } from "react";
import useClipboard from 'react-hook-clipboard';
import { ToastContainer, toast } from "react-toastify";

const ProfileCard = () => {
  const [userInfo, SetUserInfo] = useState("");

  const user = useSelector((state) => state.user);
  const Token = useSelector((state) => state.user.token);
 const [clipboard, copyToClipboard] = useClipboard()

  useEffect(() => {
    const handle = async () => {
      const UserInfoResponse = await GetUserInfo(Token);
      SetUserInfo(UserInfoResponse);
    };

    handle();
  }, []);

 const handleCopy =()=>{
  toast.success("Address Copied");
 }

  return (
    <div className="p-2 flex">
       <ToastContainer />
      <img
        src={DefaultAvatar}
        className="bg-slate-300 rounded-full mb-3 ml-2"
        height="100"
        width="100"
        alt={user.token && FormatUsername(user)}
      />
      <div className="flex flex-col">
      <p className="dashboard-user-header p-2 ">
        {user.token && FormatUsername(user)}
      </p>
      <div className="flex user-wallet-add p-2 ">

        {/* <span className="break-words "> {user.token && userInfo.address ?  userInfo.address : ""} </span> */}
        <span className="text-md self-start pb-1 pt-px">
          {user.token && userInfo.address ? userInfo.address.replace(userInfo.address.substring(7,38), "*****") : ""}</span>
       
         <span className="cursor-pointer" 
        onClick={copyToClipboard(user.token && userInfo.address ? userInfo.address : "")}> 
       <div className="px-3" onClick={handleCopy}>
       <img src={copy} alt="Copy" className="mx-2"></img>
        
         {/* <i className="fas fa-copy border-highlight p-1 element" >
      
        </i> */}
        </div>
        </span>
      </div> 
      </div>
    </div>
  );
};

export default ProfileCard;
