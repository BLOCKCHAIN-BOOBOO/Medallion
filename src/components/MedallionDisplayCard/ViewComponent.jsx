import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ValidateToken } from "../../Utils/Helper";

function ViewComponent({ ViewUrl, MedallionId }) {
  let RedirectUrl=""
  const Token = useSelector((state) => state.user.token);
   if (Token && ValidateToken()) {
       RedirectUrl = ViewUrl + MedallionId;
   }
   else{
 RedirectUrl="/login"
   }
  return (
    <Link
      to={RedirectUrl}
      className="self-center view-button"
    >
      VIEW
    </Link>
  );
}

export default ViewComponent;
