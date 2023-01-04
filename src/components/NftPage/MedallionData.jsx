import { useState } from "react";
import { ViewLessContent, ViewMoreContent } from "../../Utils/Helper";
import MemberShip from "../../EliteText.json";
import PriceComponent from "../MedallionDisplayCard/PriceComponent";

function MedallionData({ SingleRecord }) {
  const [ContentControl, SetContentControl] = useState(true);

  const GetMemberShipData = (ELITE_STATUS) => {
    const MemberShipObject = MemberShip.memberships;
    return MemberShipObject[ELITE_STATUS];
  };

  return (
    <div>
      <p>Medallion ID: {SingleRecord.medallion_ID}</p>
      <p className="text-3xl font-bold">{SingleRecord.name}</p>
      <p>Membership Status: {SingleRecord.elite_status}</p>
      {/* <p>Currency : {SingleRecord.currency} </p> */}
      {SingleRecord.status === "on_sale" && (
        <PriceComponent medallion_price={SingleRecord.price} />
      )}
      {ContentControl ? (
        <p className="py-2 text-sm">
          {ViewLessContent(GetMemberShipData(SingleRecord.elite_status), 200)}
          <button
            className="text-blue-500"
            onClick={() => SetContentControl(false)}
          >
            ...View More
          </button>
        </p>
      ) : (
        <p className="py-2 text-sm">
          {ViewMoreContent(GetMemberShipData(SingleRecord.elite_status))}
          <button
            className="text-blue-500"
            onClick={() => SetContentControl(true)}
          >
            View Less
          </button>
        </p>
      )}
    </div>
  );
}

export default MedallionData;
