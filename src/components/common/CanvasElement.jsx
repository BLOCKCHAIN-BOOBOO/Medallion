import { useRef, useEffect } from "react";
import { CreateCanvasImage, CreateCanvasImage500 } from "../../Utils/Helper";

function CanvasElement(props) {
  const canvas_element = useRef(null);
  const medallion_name = props.medallion_name;
  const medallion_elite_status = props.medallion_elite_status;
  const element_size = props.element_size;
  let CanvasFunction = "";
  if (element_size === "small") {
    CanvasFunction = CreateCanvasImage;
  } else if (element_size === "large") {
    CanvasFunction = CreateCanvasImage500;
  } else {
    CanvasFunction = CreateCanvasImage;
  }
  const canvas_width = props.canvas_width ? props.canvas_width : 310;
  const canvas_height = props.canvas_height ? props.canvas_height : 310;
  useEffect(() => {
    const response_element = CanvasFunction(
      medallion_name,
      medallion_elite_status,
      canvas_width,
      canvas_height
    );
    canvas_element.current.replaceWith(response_element);
  }, []);
  return (
    <div>
      <center>
        <canvas ref={canvas_element}></canvas>
      </center>
    </div>
  );
}

export default CanvasElement;
