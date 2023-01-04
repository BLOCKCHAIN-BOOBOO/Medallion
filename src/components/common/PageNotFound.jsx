import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div
      className="market-section-color py-10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 md:pt-10 md:pb-4 lg:pt-10 lg:pb-4 relative"
      id="content-wrap"
    >
      <div className="container mx-auto align">
        <div className="w-full flex flex-col">
          <p className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-3xl text-white self-center">
            404! PAGE NOT FOUND
          </p>
          <p className="text-xs text-white mt-4 self-center">
            Start collecting in the Marketplace or get your first pack now.
          </p>
          {/* <div className="text-center mt-4 full-width">
            <Link
              to="/market-place"
              className="rounded-3xl text-xs btn-sign md:mr-0 px-8 py-2 font-bold"
            >
              GO TO MARKETPLACE
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
