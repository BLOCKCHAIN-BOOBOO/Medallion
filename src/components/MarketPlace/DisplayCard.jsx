// import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BASE_URL,
  RAZORPAY_CREATE_ORDER,
  RAZORPAY_PAYMENT_STATUS,
} from "../../api";

// import useRazorpayInit from "../../Hooks/useRazorpayInit";
// import CheckOut from "../../payments/CheckOut";
import axios from "axios";

function DisplayCard(props) {
  // const [ShowBuyButton, SetShowBuyButton] = useState(false);
  // const [DataSlide, SetDataSlide] = useState(null);
  // const CheckOutUrl = "https://checkout.razorpay.com/v1/checkout.js";
  // const RazorPayInit = useRazorpayInit(CheckOutUrl);

  // const CREATE_ORDER_RESPONSE_DATA = async (medallion_ID, Price) => {
  //   const OrderCreateUrl = BASE_URL + RAZORPAY_CREATE_ORDER;
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   let form_data = new FormData();
  //   form_data.append("amount", Price);
  //   form_data.append("medallion_id", medallion_ID); //optional
  //   await axios
  //     .post(OrderCreateUrl, form_data, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       console.log(response.data.data.order_id);
  //       return response.data.data.order_id; //response object
  //     })
  //     .catch((error) => {
  //       console.log("Unable to connect to Server", error);
  //     })
  //     .finally(() => {
  //       console.log("Request Resolved");
  //     });
  // };

  // async function DisplayRazorPay(PROPS) {
  //   const RZPAY_ORDER_ID = await CREATE_ORDER_RESPONSE_DATA(
  //     PROPS.medallion_id,
  //     PROPS.price
  //   );
  //   console.log("Order Response", RZPAY_ORDER_ID);

  //   if (!RazorPayInit) {
  //     console.log("Script Not Initialized");
  //   } else {
  //     const options = {
  //       key: "rzp_test_f2bkf6rXvqAz0z", // Enter the Key ID generated from the Dashboard
  //       amount: PROPS.price,
  //       currency: "USD",
  //       name: PROPS.medallion_id,
  //       description: "Buy",
  //       image: "Test Image",
  //       order_id: RZPAY_ORDER_ID,
  //       handler: async function (response) {
  //         const data = {
  //           orderCreationId: RZPAY_ORDER_ID,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         };

  //         console.log("Payment Data", data);
  //         const result = await axios.post(BASE_URL + RAZORPAY_PAYMENT_STATUS);
  //         console.log("Payment Verification", result);
  //       },
  //       // prefill: {
  //       //   name: "Soumya Dey",
  //       //   email: "SoumyaDey@example.com",
  //       //   contact: "9999999999",
  //       // },
  //       // notes: {
  //       //   address: "Soumya Dey Corporate Office",
  //       // },
  //       theme: {
  //         color: "#61dafb",
  //       },
  //     };
  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   }
  // }

  return (
    <div className="col d-flex flex-column product-box">
      <div
        className="display_card"
        // onMouseEnter={() => {
        //   SetShowBuyButton(true);
        //   SetDataSlide("0px");
        // }}
        // onMouseLeave={() => {
        //   SetShowBuyButton(false);
        //   SetDataSlide(null);
        // }}
      >
        <div className="nft_model m-auto">
          {/* <img
            style={{ height: "200px", width: "auto" }}
            src={BASE_URL + "/" + props.nft_image}
            alt="Medallion"
          /> */}
        </div>

        {/* Card Info Block start */}
        <div>
          <div className="mb-1 small text-white">
            Medallion ID : #{props.medallion_id}
          </div>
          <div className="market_place_nft_text text-uppercase">
            {props.nft_name}
          </div>
          <div className="mt-2 mb-3 text-white small">
            {/* <span>Ocean ID : {props.nft_oceanId}</span>
            <br></br> */}
            <span>Membership Status : {props.nft_eliteStatus}</span>
            <br></br>
            <span>Status : {props.nft_status}</span>
            <br></br>
          </div>
          <hr />
          <div className="p-2 clearfix">
            <div className="float-start">Sale Price:</div>
            <div className="float-end">
              <span className="nft_price_text">USD ${props.nft_price}</span>
            </div>
          </div>
        </div>
        {/* Card Info Block End */}

        {/* Card Block Button start */}
        <div className="gap-1 d-grid">
          <Link
            to={`../view-single-nft/${props.medallion_id}`}
            className="btn btn-info"
          >
            VIEW
          </Link>
          <button
            className="btn btn-warning"
            // onClick={() => {
            //   DisplayRazorPay({
            //     medallion_id: props.medallion_id,
            //     price: props.nft_price,
            //   });
            // }}
          >
            BUY NOW
          </button>

          {/* <CheckOut /> */}
        </div>

        {/* Card Block Button end */}
      </div>
    </div>
  );
}

export default DisplayCard;
