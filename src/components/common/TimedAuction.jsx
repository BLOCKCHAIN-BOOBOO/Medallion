import { Link } from "react-router-dom";

function TimedAuction() {
  return (
    <div className="container mx-auto align">
      <div className="w-full flex flex-col">
        <p className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-3xl text-white self-center">
          {/* NO MEDALLIONS HERE YET */}
          Coming Soon...
        </p>
        <p className="text-xs text-white mt-4 self-center">
          Start collecting in the Marketplace or get your first pack now.
        </p>
        {/* <div className="text-center mt-4 full-width">
          <Link
            to="/user-dashboard"
            className="rounded-3xl text-xs btn-sign md:mr-0 px-8 py-2 font-bold"
          >
            GO TO DASHBOARD
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default TimedAuction;
