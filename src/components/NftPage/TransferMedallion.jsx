import { useState } from "react";
import { toast } from "react-toastify";
import { MedallionTransfer } from "../../Utils/Methods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import validator from "validator";


function TransferMedallion(props) {
  const navigate = useNavigate();
  const [UserAddress, SetUserAddress] = useState("");
  const Token = useSelector((state) => state.user.token);

  const TransferHandler = async (e) => {
    e.preventDefault();
    const update_form = toast.loading("Transferring Medallion, please wait...");
    if (validator.isEmail(UserAddress)) {
    try {
      const UpdateResponse = await MedallionTransfer(
        props.MedallionID,
        UserAddress,
        Token
      );
      if(UpdateResponse==="success"){
        toast.update(update_form, {
          render: "Medallion Transfered Successfully",
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        setTimeout(() => {
          navigate("/collection")
        },700);
        
  
        props.HandleMedallionData();
      }
      else if(UpdateResponse==="failed"){
        toast.update(update_form, {
          render: "Email does not exist ",
          type: "error",
          isLoading: false,
          autoClose: true,
        });
      }
     
    
    } catch (error) {
      toast.update(update_form, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: true,
      });
    }
  }
else{
  toast.update(update_form, {
    render: "Invalid email",
    type: "error",
    isLoading: false,
    autoClose: true,
  });
}

  };
  return (
    <div>
      <form onSubmit={TransferHandler}>
        <div className="flex flex-col">
          <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-left text-sm text-gray-500 font-medium">
            Email
          </span>
          <input
            type="email"
            required
            className="mt-1 px-3 p-1 bg-transparent shadow-sm border-gray-500 border placeholder-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 block dashboard-input-width w-64 rounded-3xl input-background sm:text-sm focus:ring"
            onChange={(e) => SetUserAddress(e.target.value)}
          />
        </div>
        <p className="text-red-500 text-sm">
          Note: Transfer of Medallion is Irreversible
        </p>
        <button className="text-white rounded-3xl bg-indigo-800 text-xs font-bold px-10 py-2 my-3">
          Transfer
        </button>
      </form>
    </div>
  );
}

export default TransferMedallion;
