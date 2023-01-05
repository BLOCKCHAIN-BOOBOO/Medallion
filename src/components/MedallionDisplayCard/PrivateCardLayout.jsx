import BasicData from "./BasicData";
import ClaimComponent from "./ClaimComponent";
import PriceComponent from "./PriceComponent";
import ViewComponent from "./ViewComponent";
import forsale from "./../../theme/images/forsale.png";
import "./../../theme/output.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GetMedallionActivity } from "../../Utils/Methods";
import { useEffect } from "react";

function PrivateCardLayout({ medallion }) {
  console.log("Private Card", medallion);

  let Medallion_Id = medallion.medallion_ID;
  const Token = useSelector((state) => state.user.token);
  const [Activitylength, SetActivityLength] = useState(null);

  const handleMedallionActivity = async (Medallion_Id, Token) => {
    try {
      const ActivityResponse = await GetMedallionActivity(Medallion_Id, Token);
      if (ActivityResponse && ActivityResponse.length) {
        SetActivityLength(ActivityResponse.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMedallionActivity(Medallion_Id, Token);
  }, [Medallion_Id, Token]);

  return (
    <div className="medallion-card text-left flex flex-col ">
      <div>
      {/* className={medallion.status === "on_sale" ? "mt-0" : "mt-4"} */}
        {medallion.status === "on_sale" && (
          <img
            src={forsale}
            alt=""
            style={{ width: "53px", height: "53px" }}
            className="-mt-9 "
          />
        )}
      </div>
      <BasicData medallion={medallion} />
      {medallion.status === "on_sale" && (
        <PriceComponent medallion_price={medallion.price} />
      )}
      <div className="text-center">
        <div className={medallion.status === "on_sale" ? "mt-0 pb-4" : "mt-7 mx-auto justify-center flex pb-4"}>
          {medallion.claimed ? (
            <ViewComponent
              ViewUrl="/collection/"
              MedallionId={medallion.medallion_ID}
            />
          ) : (
            <ClaimComponent
              MedallionId={medallion.medallion_ID}
              Activitylength={Activitylength}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PrivateCardLayout;
