import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import PublicCardLayout from "../MedallionDisplayCard/PublicCardLayout";
import PrivateCardLayout from "../MedallionDisplayCard/PrivateCardLayout";

function CardsGrid(props) {
  const [UserTokens, SetUserTokens] = useState(null);

  useEffect(() => {
    if (props.medallions) {
      SetUserTokens([...props.medallions]);
    }
  }, [props.medallions]);

  let Content = null;
  if (UserTokens) {
    if (props.display_card_for === "user") {
      //User COllection
      Content = UserTokens.map((each_row, index) => {
        return <PrivateCardLayout key={index} medallion={each_row} />;
      });
    } else {
      //Market Place Collection
      Content = UserTokens.map((each_row, index) => {
        return <PublicCardLayout key={index} medallion={each_row} />;
      });
    }
  }

  return (
    <div>
      {UserTokens && (
        <div className="container mx-auto align">
          {/* {Loading && (
            <div className="w-full flex flex-col">
              <div className="mx-auto">
                <ReactLoading type="bars" color="#fff" />
              </div>
            </div>
          )}
          {Status && (
            <div className="w-full flex flex-col">
              <div className="mx-auto">{Status}</div>
            </div>
          )} */}
          <div
            className="flex flex-col xl:flex xl:flex-col xl:justify-between grid grid-cols-1 gap-4 mt-2
            sm:grid sm:grid-cols-1 sm:gap-5 md:grid md:grid-cols-2 md:gap-7 xl:grid xl:grid-cols-3 xl:gap-20 mx-auto"
          >
            {Content}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardsGrid;
