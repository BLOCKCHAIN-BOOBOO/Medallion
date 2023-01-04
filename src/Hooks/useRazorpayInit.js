import { useEffect, useState } from "react";

const useRazorpayInit = (CheckOutUrl) => {
  const [RazorPayInit, SetRazorPayInit] = useState(false);
  useEffect(() => {
    if (!RazorPayInit) {
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = CheckOutUrl;
        document.body.appendChild(script);
        script.onload = () => {
          console.log("Added Scrit");
          resolve(true);
          SetRazorPayInit(true);
        };
        script.onerror = () => {
          console.log("Not Added Scrit");
          resolve(false);
          SetRazorPayInit(false);
        };
      });
    }
  }, [CheckOutUrl]);

  return RazorPayInit;
};

export default useRazorpayInit;
