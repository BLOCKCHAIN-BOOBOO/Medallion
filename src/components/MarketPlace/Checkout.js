import {
  BASE_URL,
  RAZORPAY_CREATE_ORDER,
  RAZORPAY_PAYMENT_STATUS,
} from "../../api";
import axios from "axios";
import PostFunction from "../common/PostFunction";

const CheckOutUrl = "https://checkout.razorpay.com/v1/checkout.js";

let GLOBAL_RAZORPAY_INIT = null;

export const RazorPayInit = async () => {
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = CheckOutUrl;
    document.body.appendChild(script);
    script.onload = () => {
      console.log("Added Scrit");
      GLOBAL_RAZORPAY_INIT = true;
      resolve(true);
    };
    script.onerror = () => {
      console.log("Not Added Scrit");
      GLOBAL_RAZORPAY_INIT = false;
      resolve(false);
    };
  });
};

export const CREATE_ORDER_RESPONSE_DATA = async (
  medallion_ID,
  Price,
  token
) => {
  if (GLOBAL_RAZORPAY_INIT) {
    console.log("Creating Order");
    const OrderCreateUrl = BASE_URL + RAZORPAY_CREATE_ORDER;
    const form_data = new FormData();
    form_data.append("amount", Price);
    form_data.append("medallion_id", medallion_ID); //optional
    const { successObject, errorObject } = await PostFunction(
      OrderCreateUrl,
      form_data,
      token
    );
    if (successObject) {
      console.log("Create Order Instance", successObject);
    }
    if (errorObject) {
      console.log("Create Order Instance", errorObject);
    }
    return { successObject, errorObject };
  } else {
    await RazorPayInit();
    console.log("Razorpay Not Initiated");
  }
};

// export const DisplayRazorPay = async () => {
//   const { successObject, errorObject } = await CREATE_ORDER_RESPONSE_DATA();
//   // PROPS.medallion_id,
//   // PROPS.price

//   console.log("Order Response", RZPAY_ORDER_ID);

//   const RP_INIT = GLOBAL_RAZORPAY_INIT
//     ? GLOBAL_RAZORPAY_INIT
//     : await RazorPayInit();

//   if (!RP_INIT) {
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
// };
