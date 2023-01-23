import { Route, Routes, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//Layouts
import Frontend from "./layouts/Frontend";
import DashboardLayout from "./layouts/DashboardLayout";
import Collection from "./components/Dashboard/Collection";

import SigninForm from "./components/Auth/SignInForm";
import SignupForm from "./components/Auth/SignupForm";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import MainPage from "./components/MarketPlace/MainPage";
import SingleNftPage from "./components/common/SingleNftPage";
import { ValidateToken } from "./Utils/Helper";
import FiltersNavbar from "./components/MarketPlace/FiltersNavbar";
import NftPage from "./components/NftPage/NftViewPage";
import Wallet from "./components/Wallets/Wallet";
import { Web3authComponent } from "./components/Wallets/web3auth/Web3authComponent";
import { UserLoggedOut } from "./store/UserAuthenticationReducer";
import { CurrentWallet_DisConnected } from "./store/CurrentWalletReducer";
import Activity from "./components/common/activity/Activity";
import NoData from "./components/common/NoData";
import TimedAuction from "./components/common/TimedAuction";

// import PageNotFound from "./components/common/PageNotFound";

function AppRoutes() {
  const token = useSelector((state) => state.user.token);
  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = async () => {
    sessionStorage.setItem("princess_store", "");
    if (CurrentWallet && CurrentWallet.wallet_name) {
      await WalletDisconnect(CurrentWallet.wallet_name);
      dispatch({
        type: UserLoggedOut,
      });
      navigate("/login");
    } else {
      dispatch({
        type: UserLoggedOut,
      });
      navigate("/login");
    }
  };

  const WalletDisconnect = async (wallet_name) => {
    if (wallet_name === "MetaMask") {
      try {
        sessionStorage.removeItem("current_wallet");
        dispatch({
          type: CurrentWallet_DisConnected,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (wallet_name === "WalletConnect") {
      try {
        sessionStorage.removeItem("walletconnect");
        sessionStorage.removeItem("current_wallet");
        dispatch({
          type: CurrentWallet_DisConnected,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (token) {
      if (ValidateToken()) {
        return;
      } else {
        SignOut();
      }
    }
  }, [token]);

  return (
    <Routes>
      <Route path="testing" element={<Web3authComponent />}></Route>
      <Route path="data-filters" element={<FiltersNavbar />}>
        {/* <Route path="all" element={<CardsGrid />}></Route> */}
        <Route path="fixed-sale" element={<NoData />}></Route>
        <Route path="timed-auction" element={<TimedAuction />}></Route>
      </Route>
      <Route path="/" exact element={<Frontend />}>
        {/*Public Routes Start*/}
        {token && ValidateToken() && (
        <Route><Route index element={<Collection />}></Route>
        <Route path="collection" element={<Collection />}>
          {/* <Route path="card-details" element={<MedalianPay />} /> */}
        </Route></Route>)}
         
        <Route index element={<MainPage />}></Route>
        <Route path="market-place" element={<MainPage />}>
          {/* <Route path="card-details" element={<MedalianPay />} /> */}
        </Route> 
        <Route
          path="view-single-nft/:MedallionId"
          element={<SingleNftPage />}
        ></Route>
        {/*Public Routes End*/}

        {/*Auth Routes Start*/}
        <Route>
          <Route path="login" element={<SigninForm />} />
          <Route path="create-user-account" element={<SignupForm />} />
        </Route>

        {/*Auth Routes End*/}

        {token && ValidateToken() ? (
          <Route>
            <Route path="collection" element={<Collection />} />
            <Route path="collection/:MedallionId" element={<NftPage />} />
            <Route path="/user-dashboard" element={<DashboardLayout />}>
              <Route path="update-profile" element={<UpdateProfile />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="update-user-password" element={<UpdatePassword />} />
            </Route>
            <Route path="activity" element={<Activity />} /> ===== approutes
          </Route>
        ) : (
          <Route path="*" element={<SigninForm />} />
        )}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
