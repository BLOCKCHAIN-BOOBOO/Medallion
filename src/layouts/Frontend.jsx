import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import NavBar from "../components/Nav/NavBarNew";
import {
  ConnectedChainId,
  MetaMaskUserAccount,
} from "../components/Wallets/MetaMask";
import { CurrentWallet_Connected } from "../store/CurrentWalletReducer";
import { useDispatch } from "react-redux";

function Frontend() {
  const dispatch = useDispatch();
  let current_wallet = {
    user_account: null,
    chainId: null,
    wallet_name: null,
  };

  const UpdateState = (current_wallet) => {
    try {
      let current_wallet_string = JSON.stringify(current_wallet);
      sessionStorage.setItem("current_wallet", current_wallet_string);
      dispatch({
        type: CurrentWallet_Connected,
        payload: {
          user_account: current_wallet.user_account,
          chainId: current_wallet.chainId,
          wallet_name: current_wallet.wallet_name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Metamask
  const ConnectToMetaMask = async () => {
    try {
      const account = await MetaMaskUserAccount();
      const connected_chainid = await ConnectedChainId();
      if (account) {
        current_wallet.user_account = account;
        current_wallet.chainId = connected_chainid;
        current_wallet.wallet_name = "MetaMask";
        UpdateState(current_wallet);
      }
    } catch (error) {
      console.log("Show WALLETS", error);
    }
  };

  const DetectMetaMaskNetworkChange = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("No MetaMask found");
      } else {
        await window.ethereum.on("chainChanged", async () => {
          await ConnectToMetaMask();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useCallback(async () => {
  //   const current_chainid = await ConnectedChainId();
  //   console.log(current_chainid);
  // }, []);

  useEffect(() => {
    DetectMetaMaskNetworkChange();
  }, []);

  return (
    <div id="page-container">
      <NavBar />
      {/*UI THEME HOME PAGE START*/}
      <div className="z-0">
        <Outlet />
      </div>
      {/*UI THEME HOME PAGE END*/}
      <Footer />
    </div>
  );
}

export default Frontend;
