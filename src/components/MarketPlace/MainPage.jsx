import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MARKET_PLACE_NFTS, GET_ALL_ONSALE_NFTS } from "../../api";
import CardsGrid from "../common/CardsGrid";
import ReactLoading from "react-loading";
import NoData from "../common/NoData";
import TitleBanner from "../common/TitleBanner";
import MenuBar from "./MenuBar";
import { ValidateToken } from "../../Utils/Helper";
import { GetMarketPlaceMedallions } from "../../Utils/Methods";
import { ToastContainer, toast } from "react-toastify";
import MedalianPay from "../common/MedalianPay";
import { Outlet } from "react-router";
import TimedAuction from "../common/TimedAuction";

function MainPage() {
  const Token = useSelector((state) => state.user.token);
  const [UserTokens, SetUserTokens] = useState();
  const [Loading, SetLoading] = useState(false);

  const LoadFilteredData = (FilteredData) => {
    SetLoading(true);
    SetUserTokens(FilteredData);
    SetLoading(false);
  };

  const HandleCollection = async (Token) => {
    SetLoading(true);
    const MarketPlaceCollectionUri =
      Token && ValidateToken() ? MARKET_PLACE_NFTS : GET_ALL_ONSALE_NFTS;
    try {
      const MarketPlaceRecords = await GetMarketPlaceMedallions(
        MarketPlaceCollectionUri,
        Token
      );
      MarketPlaceRecords.length && SetUserTokens(MarketPlaceRecords);
    } catch (error) {
      toast.error(error);
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    //  document.body.classList.remove('modal-open');
    HandleCollection(Token);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [Token],[]);
  

  return (
    <div id="content-wrap">
      <ToastContainer />
      <section className="py-10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 md:pt-10 md:pb-4 lg:pt-10 lg:pb-4 relative">
      {/* marketplace-section  */}
        <div className="container mx-auto flex flex-col md:flex md:flex-col lg:flex lg:flex-col align">
          <TitleBanner title="Marketplace" />
          <MenuBar LoadFilteredData={LoadFilteredData} />
        </div>
      </section>
      <div className="market-section-color">
        <section className="market-background relative pt-2 pb-20 xl:pt-2">
          {/* <Banner /> */}
          <div className="m-3 p-3 flex flex-col">
            <div className="self-center">
              {Loading && <ReactLoading type="bars" color="#fff" />}
            </div>
          </div>

          {!Loading && UserTokens && <CardsGrid medallions={UserTokens} />}
          {!Loading && !UserTokens && <NoData />}

          {/* {!Loading && !UserTokens && <TimedAuction />} */}
        </section>
      </div>
    </div>
  );
}

export default MainPage;
