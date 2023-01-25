import { useRef, useEffect } from "react";
import { CreateCanvasImage, CreateCanvasImage500 } from "../../Utils/Helper";

import Logo from "./../../theme/images/Logo.png";

function CanvasElement(props) {
  console.log(props)
  const canvas_element = useRef(null);
  const medallion_name = props.medallion_name;
  const medallion_elite_status = props.medallion_elite_status;
  const inner_ring_color =props.inner_ring;
  const element_size = props.element_size;
  let CanvasFunction = "";
  if (element_size === "small") {
    CanvasFunction = CreateCanvasImage;
  } else if (element_size === "large") {
    CanvasFunction = CreateCanvasImage500;
  } else {
    CanvasFunction = CreateCanvasImage;
  }
  // const canvas_width = props.canvas_width ? props.canvas_width : 310;
  // const canvas_height = props.canvas_height ? props.canvas_height : 310;
  useEffect(() => {
    const response_element = CanvasFunction(
      medallion_name,
      medallion_elite_status,
      inner_ring_color ,
      // canvas_width,
      // canvas_height
    );
    canvas_element.current.replaceWith(response_element);
  }, []);
  return (
    <div>
      <center>
      <div className="" style={{padding:"30px"}}>
        <div className="rounded-full bg-slate-300 w-full metal-ring" style={{padding:"3.25rem 3rem"}}
        // medallion_name={props.medallion.name}
        //   medallion_elite_status={props.medallion.elite_status}
          >
          {/* <span className="text-md" >{props.medallion.name}</span> */}
          
         

          <svg 
          // viewBox="-5 0 130 130" style={{width:"100%"}}
          viewBox="0 0 100 100"
           width="100" height="100"
          className="text-alignment" >
  <path id="MyPath" fill="none" 
 d="
 M 50, 50
 m -37, 0
 a 37,37 0 1,1 74,0
 a 37,37 0 1,1 -74,0"
  // stroke="lightblue"  d="m10,45c53,-38 96,18 60,3" 
        />
        {/* <path id="MyPath" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" /> */}

<text style={{fontSize:"9px"}}  className="flex self-center text-center justify-center">
  <textPath className="" startOffset="25%" textAnchor="middle" style={{fontSize:"9px !important"}}  href="#MyPath">
    { medallion_name}</textPath>
  </text>

</svg>

<div className="rounded-full self-center text-center h-full " style={{padding:"4.3rem 3rem", backgroundColor:`${inner_ring_color }`}}>
        <img src={Logo} alt="Princess" className="mx-auto self-center"></img>
        </div>
        
        </div> 
        </div>
        <canvas ref={canvas_element}></canvas>
      </center>
      
    </div>
  );
}

export default CanvasElement;
