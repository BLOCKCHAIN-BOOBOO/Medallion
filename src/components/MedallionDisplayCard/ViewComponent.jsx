import { Link } from "react-router-dom";

function ViewComponent({ ViewUrl, MedallionId }) {
  const RedirectUrl = ViewUrl + MedallionId;
  return (
    <Link
      to={RedirectUrl}
      className="text-white rounded-3xl btn-sign md:mr-2 px-10 py-1 font-bold"
    >
      VIEW
    </Link>
  );
}

export default ViewComponent;
