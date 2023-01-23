import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardsGrid from "../common/CardsGrid";
import ReactLoading from "react-loading";
import NoData from "../common/NoData";
import TitleBanner from "../common/TitleBanner";
import { GetUserCollection } from "../../Utils/Methods";
import { ToastContainer, toast } from "react-toastify";
// import { Web3authComponent } from "../Wallets/web3auth/Web3authComponent";

function Collection(props) {
  const Token = useSelector((state) => state.user.token);
  const [UserTokens, SetUserTokens] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const HandleCollection = async (Token) => {
    SetLoading(true);
    // const id = toast.loading("Getting Profile Data");
    try {
      const Records = await GetUserCollection(Token);
      Records.length && SetUserTokens(Records);
    } catch (error) {
      toast.error(error);
    } finally {
      SetLoading(false);
      // toast.update(id, {
      //   render: "Profile Data Loaded Successfully",
      //   type: "success",
      //   isLoading: false,
      // });
    }
  };
  // useEffect(() => {
  //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  // }, []);
  useEffect(() => {
    HandleCollection(Token);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [Token], []);

  return (
    <div id="content-wrap">
      <ToastContainer />
      <section className=" py-10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 md:pt-10 md:pb-4 lg:pt-10 lg:pb-4 relative">
      {/* marketplace-section */}
        <div className="container mx-auto flex flex-col md:flex md:flex-col lg:flex lg:flex-col align">
          <TitleBanner title="My collection" />
        </div>
      </section>
      <div className="market-section-color">
        <section className="market-background relative pt-2 pb-20 xl:pt-2">
          <div className="m-3 p-3 flex flex-col">
            <div className="self-center">
              {Loading && <ReactLoading type="bars" color="#fff" />}
            </div>
          </div>

          {!Loading && UserTokens && (
            <CardsGrid medallions={UserTokens} display_card_for="user" />
          )}
          {!Loading && !UserTokens && <NoData />}
        </section>
      </div>
    </div>
  );
}

export default Collection;
