// import { ChangeSaleText } from "../../Utils/Helper";
import CanvasElement from "../common/CanvasElement";

function BasicData(props) {
  return (
    <div>
      {props.medallion.name && (
        <CanvasElement
          medallion_name={props.medallion.name}
          medallion_elite_status={props.medallion.elite_status}
          element_size="small"
        />
      )}
      <span> Medallion ID : #{props.medallion.medallion_ID}</span>
      <h3 className="text-2xl font-bold mb-1">{props.medallion.name}</h3>
      <span>Membership Status : {props.medallion.elite_status}</span>
      {/* <span>Sale Status : {ChangeSaleText(props.medallion.status)}</span> */}
    </div>
  );
}

export default BasicData;
