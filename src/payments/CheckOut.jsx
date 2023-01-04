import axios from "axios";

function CheckOut() {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    //const result = await axios.post("http://localhost:5000/payment/orders");

    // //Example Data
    // const result = {
    //   data: {
    //     amount: 220,
    //     order_id: "ADSFADFSASDS",
    //     currency: "INR",
    //   },
    // };

    // if (!result) {
    //   alert("Server error. Are you online?");
    //   return;
    // }

    //const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_f2bkf6rXvqAz0z", // Enter the Key ID generated from the Dashboard
      amount: "500000",
      currency: "INR",
      name: "Test Name",
      description: "Test Transaction",
      image: "Test Image",
      //order_id: "8143f3oq45t",
      handler: async function (response) {
        const data = {
          //orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        console.log("Payment Success Data", data);
        // const result = await axios.post(
        //   "http://localhost:5000/payment/success",
        //   data
        // );
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <button className="btn btn-warning" onClick={displayRazorpay}>
      Buy Now
    </button>
  );
}

export default CheckOut;
