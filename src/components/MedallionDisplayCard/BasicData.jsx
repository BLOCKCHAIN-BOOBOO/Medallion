// import { ChangeSaleText } from "../../Utils/Helper";
import CanvasElement from "../common/CanvasElement";

function BasicData(props) {
  return (
    <>
    <div className="self-center medallion-card-background text-center">
       <div className="medallion-second-card">
       <h3 className="medallion-name-text pt-4 mb-1">{props.medallion.name}</h3>
      
      {props.medallion.name && (
        <CanvasElement className="border-4 rounded-full"
          medallion_name={props.medallion.name}
          medallion_elite_status={props.medallion.elite_status}
          element_size="extrasmall"
        />
      )}
      </div>
      </div>
      {/* Membership Status :  */}
      <div className="flex flex-col mt-32">
      <div className="flex mx-auto">
      <span
      //  className="gold-button button-wave flex mx-auto  self-center text-center justify-center "
      
      className={`button-wave flex mx-auto  self-center text-center justify-center" 
      ${props.medallion.elite_status === "GOLD" &&" gold-button"} ${props.medallion.elite_status==="ELITE" &&" elite-button"} 
      ${props.medallion.elite_status==="BLUE" &&" blue-button"} ${props.medallion.elite_status==="RUBY" &&" ruby-button"}`}
      
      >
        
        
        
        {props.medallion.elite_status}</span>
      </div>
      <span className="dashboard-tabs-text mt-5"> Medallion ID : #{props.medallion.medallion_ID}</span>
      </div>
      
      {/* <span>Sale Status : {ChangeSaleText(props.medallion.status)}</span> */}
   </>
  );
}

export default BasicData;
