// import { ChangeSaleText } from "../../Utils/Helper";
import CanvasElement from "../common/CanvasElement";
import Logo from "./../../theme/images/Logo.png";

function BasicData(props) {
  return (
    <>
    <div className="self-center medallion-card-background text-center">
       <div className="medallion-second-card p-5">
       <h3 className="medallion-name-text pt-4 mb-1">{props.medallion.name}</h3>
      
      {props.medallion.name && (
        // <CanvasElement className="border-4 rounded-full"
        //   medallion_name={props.medallion.name}
        //   medallion_elite_status={props.medallion.elite_status}
        //   element_size="extrasmall"
        // />
       <div className="" style={{padding:"30px"}}>
        <div className="rounded-full bg-slate-300 w-full" 
          medallion_elite_status={props.medallion.elite_status}>
          {/* <span className="text-md" >{props.medallion.name}</span> */}
          
         

          <svg viewBox="-5 0 130 130" className="text-alignment" style={{width:"100%"}}>
  <path id="MyPath" fill="none" stroke="lightblue"
        d="m10,45c53,-38 96,18 60,3" />
        {/* <path id="MyPath" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" /> */}

<text className="flex self-center text-center justify-center">
  <textPath href="#MyPath">{props.medallion.name}</textPath>
  </text>

</svg>

<div className="rounded-full self-center text-center h-full bg-yellow-400">
        <img src={Logo} alt="Princess" className="mx-auto self-center"></img>
        </div>
        
        </div> 
        </div>
      )}
      </div>
      </div>
      {/* Membership Status :  */}
      <div className="flex flex-col mt-32 mobile-margin">
      <div className="flex mx-auto">
      <span
      //  className="gold-button button-wave flex mx-auto  self-center text-center justify-center "
      
      className={`button-wave flex mx-auto  self-center text-center justify-center" 
      ${props.medallion.elite_status === "GOLD" &&" gold-button"} ${props.medallion.elite_status==="ELITE" &&" elite-button"} 
      ${props.medallion.elite_status==="BLUE" &&" blue-button"} ${props.medallion.elite_status==="RUBY" &&" ruby-button"}`}
      
      >
        
        
        
        {props.medallion.elite_status}</span>
      </div>
      <span className="dashboard-tabs-text self-center text-center mt-5"> Medallion ID : #{props.medallion.medallion_ID}</span>
      </div>
      
      {/* <span>Sale Status : {ChangeSaleText(props.medallion.status)}</span> */}
   </>
  );
}

export default BasicData;
