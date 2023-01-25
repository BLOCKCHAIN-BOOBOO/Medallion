import { useState } from "react";
// import { ViewLessContent, ViewMoreContent } from "../../Utils/Helper";
// import MemberShip from "../../EliteText.json";
import PriceComponent from "../MedallionDisplayCard/PriceComponent";

function MedallionData({ SingleRecord }) {
  // const [ContentControl, SetContentControl] = useState(true);

  // const GetMemberShipData = (ELITE_STATUS) => {
  //   const MemberShipObject = MemberShip.memberships;
  //   return MemberShipObject[ELITE_STATUS];
  // };

  return (
    <div className="flex flex-col m-2 self-center sm:self-center md:self-start xl:self-start">

{/* <p className="text-3xl font-bold">{SingleRecord.name}</p> */}

      <p className="dashboard-tabs-text xl:self-start md:self-start self-center text-center py-1">Medallion ID: {SingleRecord.medallion_ID}</p>
   
      <p className="dashboard-tab-header py-2 hidden sm:flex md:flex xl:flex"> {SingleRecord.elite_status}</p>
      {/* Membership Status: */}
      {/* <p>Currency : {SingleRecord.currency} </p> */}

    
      <span
      //  className="gold-button button-wave flex mx-auto  self-center text-center justify-center "
      style={{backgroundColor:`${SingleRecord.inner_ring}`}}
      className={`button-wave flex xl:self-start md:self-start sm:self-center self-center cursor-default" 
      ${SingleRecord.elite_status === "GOLD" &&" gold-button"} ${SingleRecord.elite_status==="ELITE" &&" elite-button"} 
      ${SingleRecord.elite_status==="BLUE" &&" blue-button"} ${SingleRecord.elite_status==="RUBY" &&" ruby-button"}`}
      
      >
        {SingleRecord.elite_status}</span>
     


      {SingleRecord.status === "on_sale" && (
        <PriceComponent medallion_price={SingleRecord.price} />
      )}
      {/* {ContentControl ? (
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
      )} */}
    </div>
  );
}

export default MedallionData;
