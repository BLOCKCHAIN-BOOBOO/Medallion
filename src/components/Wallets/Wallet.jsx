import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CurrentWallet_Connected,
  CurrentWallet_DisConnected,
} from "../../store/CurrentWalletReducer";
import Modal from "../common/Modal";
import { Modal_Opened } from "../../store/ModalReducer";
import ShowWallets from "./ShowWallets";
import { ClaimFund, GetWalletBalance } from "../../Utils/Methods";
import { toast, ToastContainer } from "react-toastify";

import { MetaMaskUserAccount, ConnectedChainId } from "./MetaMask";

function Wallet() {
  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  const Token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [Loading, SetLoading] = useState(false);
  const [EthBalance, SetEthBalance] = useState(0);
  // const [MaticBalance, SetMaticBalance] = useState(0);
  const [ModalTitle, SetModalTitle] = useState(null);
  const [ModalBody, SetModalBody] = useState(null);
  const [HideCloseOption, SetHideCloseOption] = useState(true);

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

  const HandleWalletBalance = async () => {
    SetLoading(true);
    // const id = toast.loading("Getting Profile Data");
    try {
      const WalletBalance = await GetWalletBalance(Token);
      SetEthBalance(WalletBalance);
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
      console.log("WalletConnect Disconnect");
      try {
        sessionStorage.removeItem("walletconnect");
        sessionStorage.removeItem("current_wallet");
        dispatch({
          type: CurrentWallet_DisConnected,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Open Modal
  const handleModalOpen = async () => {
    const account = await MetaMaskUserAccount();
    const connected_chainid = await ConnectedChainId();
    if (account) {
      current_wallet.user_account = account;
      current_wallet.chainId = connected_chainid;
      current_wallet.wallet_name = "MetaMask";
      UpdateState(current_wallet);
    }
    // toast.update(update_form, {
    //   render: "Connected",
    //   type: "success",
    //   isLoading: false,
    //   autoClose: true,
    // });
  };

  const handleClaimFund = async () => {
    const update_form = toast.loading("Processing");
    if (EthBalance) {
      try {
        
        const ClaimFundResponse = await ClaimFund(
          CurrentWallet.user_account,
          Token
        );
        if (ClaimFundResponse) {
          toast.update(update_form, {
            render: "Wallet Fund Claimed Successfully",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
          SetModalTitle("Wallet Fund Claimed Successfully");
          SetModalBody(ClaimFundResponse);
          SetHideCloseOption(false);
          window.location.reload();
        }
        console.log("Response", ClaimFundResponse);
      } catch (error) {
        toast.update(update_form, {
          render: "Claiming Wallet Fund Failed",
          type: "error",
          isLoading: false,
          autoClose: true,
        });
        SetModalTitle("Claiming Wallet Fund Failed");
        SetModalBody(error.Message);
        SetHideCloseOption(false);
      }
    } else {
      toast.update(update_form, {
        render: "No Balance",
        type: "error",
        isLoading: false,
        autoClose: true,
      });
      handleModalOpen();
      SetModalTitle("No Wallet Balance");
      SetModalBody("Please try again...");
      SetHideCloseOption(false);
    }
  };
var ethball=1212.23234234.toFixed(3);
  useEffect(() => {
    HandleWalletBalance();
  }, []);

  return (
    <div className="my-2">
      <ToastContainer />
      {ModalTitle && ModalBody && (
        <Modal hide_close_button={HideCloseOption && HideCloseOption}>
          <div>
            <h1 className="text-3xl p-4 ">{ModalTitle && ModalTitle}</h1>
            <div className="flex flex-col p-4">
              <p className="text-bold text-xl py-3">{ModalBody && ModalBody}</p>
            </div>
          </div>
        </Modal>
      )}

      {CurrentWallet && CurrentWallet.user_account ? (
        <div className="login-card text-center border mx-auto rounded-xl xl:w-1/4 md:w-2/4 sm:w-2/4 w-full space-y-2 p-5">
          <div className="py-1">
            <p className="">Wallet Balance</p>
            {/* <span className="p-2 bg-white"> */}
              <p className="dashboard-tab-header">
                {/* {CurrentWallet.chainId === "0x4" ? "ETH " : "MATIC "} */}
                ETH {EthBalance ? EthBalance.toFixed(3) : 0}
              </p>
            {/* </span> */}
          </div>

          <button
            className="rounded-3xl active-button md:mr-2 px-10 py-1 my-2 font-bold"
            onClick={() => handleClaimFund()}
          >
            Claim Fund
          </button>

          <p
            className="dashboard-tabs-text break-all"
            style={{ "overflowWrap": "break-word", "wordBreak": "break-all" }}
          >
            {/* Account : {CurrentWallet && CurrentWallet.user_account} */}
            Account : {CurrentWallet.user_account.replace(CurrentWallet && CurrentWallet.user_account.substring(7,20), "*****")}
          </p>
          {/* <p className="text-white">
            Account : {CurrentWallet && CurrentWallet.user_account.substring(0, 7)}....
          </p> */}

          {/* <p className="text-white">
            Chain Id : {CurrentWallet && CurrentWallet.chainId}
          </p> */}
          <p className="dashboard-tabs-text">Wallet Type : {CurrentWallet && CurrentWallet.wallet_name}</p>
          <button
            className="disconnect-wallet bg-red-500"
            onClick={() => WalletDisconnect(CurrentWallet.wallet_name)}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="p-2">
          <div className="flex mx-auto block">
          <button
            className="p-2 connect-wallet-button hover:cursor-pointer mx-auto"
            onClick={() => handleModalOpen()}
          >
            Connect Your Wallet
          </button>
          </div>
          <Modal hide_close_button={false}>
            <h1 className="text-3xl p-4 self-center">Connect Wallet</h1>
            <ShowWallets />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Wallet;
