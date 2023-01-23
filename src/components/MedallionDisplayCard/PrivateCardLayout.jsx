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
    }
  };

  useEffect(() => {
    handleMedallionActivity(Medallion_Id, Token);
  }, [Medallion_Id, Token]);

  return (
    <div className="medallion-card text-left mx-auto self-center flex flex-col ">
      <div className="float-right self-end">
      {/* className={medallion.status === "on_sale" ? "mt-0" : "mt-4"} */}
        {medallion.status === "on_sale" && (
          <img
            src={forsale}
            alt=""
            style={{ width: "60px", height: "60px" }}
            className="-mt-1 z-10 absolute -ml-16 "
          />
        )}
      </div>
      <BasicData medallion={medallion} />
      {medallion.status === "on_sale" && (
        <PriceComponent medallion_price={medallion.price} />
      )}
      <div className="text-center">
        <div className={medallion.status === "on_sale" ? "mt-0 pb-4" : "mt-14 mx-auto justify-center flex pb-4"}>
          {medallion.claimed ? (
            <ViewComponent
              ViewUrl="/collection/"
              MedallionId={medallion.medallion_ID}
            />
           ) : ( 
           <div className="flex">
            <ViewComponent
            ViewUrl="/collection/"
            MedallionId={medallion.medallion_ID}
          />
            <ClaimComponent
              MedallionId={medallion.medallion_ID}
              Activitylength={Activitylength}
            />
            </div>
           )} 
        </div>
      </div>
    </div>
  );
}

export default PrivateCardLayout;
