import { useSelector } from "react-redux";
import DefaultAvatar from "./../../theme/images/avatar.png";
import { FormatUsername } from "../../Utils/Helper";
import { useEffect } from "react";
import { GetUserInfo } from "../../Utils/Methods";
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
    <div className="p-2">
       <ToastContainer />
      <img
        src={DefaultAvatar}
        className="bg-slate-300 rounded-full mb-3 ml-2"
        height="100"
        width="100"
        alt={user.token && FormatUsername(user)}
      />
      <p className="font-bold text-md p-2 ">
        {user.token && FormatUsername(user)}
      </p>
      <div className="flex font-bold text-md p-2 ">

        {/* <span className="break-words "> {user.token && userInfo.address ?  userInfo.address : ""} </span> */}
        <span className="text-md self-start pb-1 pt-px">
          {user.token && userInfo.address ? userInfo.address.replace(userInfo.address.substring(7,38), "*****") : ""}</span>
       
         <span className="cursor-pointer" 
        onClick={copyToClipboard(user.token && userInfo.address ? userInfo.address : "")}> 
       <div className="px-3" onClick={handleCopy}> <i className="fa fa-copy border-highlight p-1 element" >
        {/* <span className="tooltip">Copy</span> */}
        </i>
        </div>
        </span>
      </div> 
    </div>
  );
};

export default ProfileCard;
