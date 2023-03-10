// import { ChangeSaleText } from "../../Utils/Helper";
import CanvasElement from "../common/CanvasElement";
import Logo from "./../../theme/images/Logo.png";

function BasicData(props) {

  return (
    <>
    <div className="self-center medallion-card-background text-center">
       <div className="medallion-second-card  collection">
       {/* p-5 */}
       <h3 className="medallion-name-text pt-4 mb-1">{props.medallion.name}</h3>
      
      {props.medallion.name && (
        <CanvasElement className="border-4 rounded-full"
          medallion_name={props.medallion.name}
          medallion_elite_status={props.medallion.elite_status}
          element_size="extrasmall"
          inner_ring={props.medallion.inner_ring}
        />
      
//       <div className="" style={{padding:"30px"}}>
//         <div className="rounded-full bg-slate-300 w-full metal-ring" style={{padding:"3.25rem 3rem"}}
//         medallion_name={props.medallion.name}
//           medallion_elite_status={props.medallion.elite_status}>
//           {/* <span className="text-md" >{props.medallion.name}</span> */}
          
         

//           <svg 
//           // viewBox="-5 0 130 130" style={{width:"100%"}}
//           viewBox="0 0 100 100"
//            width="100" height="100"
//           className="text-alignment" >
//   <path id="MyPath" fill="none" 
//  d="
//  M 50, 50
//  m -37, 0
//  a 37,37 0 1,1 74,0
//  a 37,37 0 1,1 -74,0"
//   // stroke="lightblue"  d="m10,45c53,-38 96,18 60,3" 
//         />
//         {/* <path id="MyPath" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" /> */}

// <text style={{fontSize:"9px"}}  className="flex self-center text-center justify-center">
//   <textPath className="" startOffset="25%" text-anchor="middle" style={{fontSize:"9px !important"}}  href="#MyPath">{props.medallion.name}</textPath>
//   </text>

// </svg>

// <div className="rounded-full self-center text-center h-full bg-yellow-400" style={{padding:"4.3rem 3rem"}}>
//         <img src={Logo} alt="Princess" className="mx-auto self-center"></img>
//         </div>
        
//         </div> 
//         </div>
      )}
      </div>
      </div>
      {/* Membership Status :  */}
      <div className="flex flex-col mt-20 mobile-margin">
      <div className="flex mx-auto">
      <span
      //  className="gold-button button-wave flex mx-auto  self-center text-center justify-center "
      style={{backgroundColor:`${props.medallion.inner_ring}`}}
      
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
