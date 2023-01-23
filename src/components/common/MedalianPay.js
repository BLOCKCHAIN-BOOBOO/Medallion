import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../src/theme/input.css";
import { BASE_URL, GET_PAYMENT_METHODS, MEDPAY_BUY } from "../../api";
import GetFunction from "./GetFunction";
import HandleError from "./HandleError";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import cardchip from "./../../theme/images/wallets/cardchip.png";

import discover from "./../../theme/images/wallets/discover.png";
import visa from "./../../theme/images/wallets/visa.png";
import amex from "./../../theme/images/wallets/amex.png";

// import { PostFunction } from "../../Utils/Helper";
import PostFunction from "./PostFunction";
import "./../../theme/output.css";

const MedalianPay = ({ setShowModal, handleModalClose, medid }) => {
  const [records, setRecords] = useState([]);
  const [Loading, SetLoading] = useState(false);

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const ResponseObject = {
    data: null,
    status: null,
    message: null,
  };
  const getActivity = async () => {
    SetLoading(true);
    const email = JSON.parse(window.sessionStorage.getItem("princess_store"));
    const FilterDataUrl = BASE_URL + GET_PAYMENT_METHODS;
    const { result, RequestResolved } = await GetFunction(FilterDataUrl, token);
    if (RequestResolved) {
      const { ResultType, Message } = HandleError(result);
      if (ResultType === "success") {
        const record = result?.data?.data && result?.data?.data;
        SetLoading(false);
        // toast.success(
        //   result?.data?.data ? " fetched Successfully" : "NO DATA TO FETCH"
        // );
        setRecords(record);
      } else {
        SetLoading(false);
      }
    }
  };

  const close = () => {
    document.body.classList.remove('modal-open');
    setShowModal(false);
    handleModalClose();
  };

  const getdetails = async (data) => {
    SetLoading(true);
    const update_form = toast.loading("Processing");
    try {
      const ClaimUrl = BASE_URL + MEDPAY_BUY;
      const form_data = new FormData();
      form_data.append("medallion_id", medid);
      form_data.append("payment_method_id", data.paymentmethod_id);
      form_data.append("card_name", data.cardname);
      form_data.append("last4", data.last4);
      form_data.append("card_type", data.card_type);
      const { result, RequestResolved } = await PostFunction(
        ClaimUrl,
        form_data,
        token
      );

      if (RequestResolved) {
        const { ResultType, Message } = HandleError(result);
        if (ResultType === "success") {
          toast.update(update_form, {
            render: "BOUGHT",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
          SetLoading(false);
          navigate("/collection/"+ medid);
          return Message;
        } else {
          SetLoading(false);
          toast.error(Message);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div className="medallion-pay-card medallion-pay-card-height p-4">
      <div className="title flex flex-row justify-between">
        <div className="medallion-header-text text-white self-center mx-auto"> Medallion Pay</div>
        <div
          onClick={close}
          className="justify-end p-2 text-sm text-white"
        >
          <i className="fa fa-close"></i>
        </div>
      </div>
      <div className="caredWrap h-96 overflow-y-auto m-0">
        <ToastContainer />
        <div className="w-full flex flex-col">
          <div className="self-center">
            {Loading && <ReactLoading type="bars" color="#fff" />}
          </div>
        </div>
        {/* {Loading ? (
          <ReactLoading type="bars" color="#fff" />
        ) : (
          <> */}
          <div className="flex mx-auto">
        {records ? (
          records.map((rec, index) => {
            return (
              <div
                key={index}
                className="card-details text-white cursor-pointer my-5"
                onClick={(e) => getdetails(rec)}
              >
                
                {/* <div className="text-right">
                  <span className="text-xl text-right font-semibold">Bank Name</span>
                </div> */}
                 <div className="text-left">
                  {/* <span>Card Type :</span> */}
                  
                  {/* <span className="text-xl font-bold text-right">{rec.cardtype}</span> */}
                  <div >
                  {rec.cardtype == "DISCOVER" &&   <img src={discover} alt="discover" style={{ height: "30px" , width:"100px"}} />}
                  {rec.cardtype == "VISA" &&   <img src={visa} alt="visa" style={{ height: "30px" , width:"100px"}} />}
                  {rec.cardtype == "AMEX" &&   <img src={amex} alt="amex" style={{ height: "40px" , width:"100px"}} />}
                  </div>
                   </div>
                 <div className="flex flex-row justify-between">
                   <div className="mt-2">
                     <img src={cardchip} alt="cardchip" style={{ height: "30px" , width:"40px"}} />
                   </div>
                   <div className="text-sm mt-2">
                     {/* <span>Card No :</span> */}
                     <span className="card-no-size font-medium">xxxx-xxxx-xxxx-{rec.last4}</span>
                   </div>
                 </div>               
                <div className="mt-2 text-left">
                  {/* <span>Name on Card :</span> */}
                  <span className="text-sm font-normal self-start text-left">{rec.cardname}</span>
                </div>
               
               
                {/* <div>
                      <span>paymentmethod_id :</span>
                      <span>{rec.paymentmethod_id}</span>last4
                    </div> */}
              </div>
            );
          })
        ) : (
          // <div className="text-white text-bold">NO CARD DETAILS</div>
          <div className="flex flex-col mx-auto">
          <div
          className="card-details text-white cursor-pointer my-5"
        >
          
          <div className="text-left">
            <div><img src={visa} alt="visa" style={{ height: "30px" , width:"100px"}} /></div>
            <div className="flex flex-row justify-between">
                   <div className="mt-2">
                     <img src={cardchip} alt="cardchip" style={{ height: "30px" , width:"40px"}} />
                   </div>
                   <div className="text-sm mt-2">
                     <span className="card-no-size font-medium">xxxx-xxxx-xxxx-7890</span>
                   </div>
                 </div>               
                <div className="mt-2 text-left">
                  <span className="text-sm font-normal self-start text-left">VENU KRISH</span>
                </div>
            </div>
            </div>


<div
className="card-details text-white cursor-pointer my-5"
>

<div className="text-left">
  <div> <img src={visa} alt="visa" style={{ height: "30px" , width:"100px"}} /></div>
  <div className="flex flex-row justify-between">
         <div className="mt-2">
           <img src={cardchip} alt="cardchip" style={{ height: "30px" , width:"40px"}} />
         </div>
         <div className="text-sm mt-2">
           <span className="card-no-size font-medium">xxxx-xxxx-xxxx-7890</span>
         </div>
       </div>               
      <div className="mt-2 text-left">
        <span className="text-sm font-normal self-start text-left">VENU KRISH</span>
      </div>
  </div>
  </div>
  </div>
        )}
        </div>
        {/* </>
        )} */}
      </div>
    </div>
  );
};

export default MedalianPay;
