import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { providers } from "ethers";
import MetaMaskLogo from "./../../theme/images/wallets/Metamask-logo.png";
import medallionpaylogo from "./../../theme/images/wallets/logo_medallion_pay.png";
import { MetaMaskUserAccount, ConnectedChainId } from "./MetaMask";
import {
  CurrentWallet_Connected,
  CurrentWallet_DisConnected,
} from "../../store/CurrentWalletReducer";
import { Modal_Closed } from "../../store/ModalReducer";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Modal_Opened } from "../../store/ModalReducer";
import { ValidateToken } from "../../Utils/Helper";
import { toast, ToastContainer } from "react-toastify";
import { Purchase } from "../Dashboard/Buy";
import MedalianPay from "../common/MedalianPay";

function ShowWallets({ medallion_id }) {
  const [showactivity, setShowModal] = useState();
  const Token = useSelector((state) => state.user.token);
  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  //Metamask
  const ConnectToMetaMask = async (medallion_id) => {
    handleModalClose();
    try {
      if (CurrentWallet && CurrentWallet.user_account) {
        const update_form = toast.loading("Processing...",{autoClose:true});
        try {
          const PruchaseResponse = await Purchase(
            Token,
            medallion_id,
            CurrentWallet.user_account,
            CurrentWallet.chainId,
            "MetaMask"
          );
          toast.update(update_form, {
            render: "Purchased",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
          navigate("/collection/"+ medallion_id);
        } catch (error) {
          toast.update(update_form, {
            render: error.message.slice(0,50),
            type: "error",
            isLoading: false,
            autoClose: true,
          });
        }
      } else {
        const update_form =  toast.loading("Processing...", { autoClose: true });
        const account = await MetaMaskUserAccount();
        const connected_chainid = await ConnectedChainId();
        if (account) {
          current_wallet.user_account = account;
          current_wallet.chainId = connected_chainid;
          current_wallet.wallet_name = "MetaMask";
          UpdateState(current_wallet);
        }

        try {
          // toast.update(update_form, {
          //   render: "Processing ",
          //   type: "success",
          //   isLoading: true,
          // });
          const PruchaseResponse = await Purchase(
            Token,
            medallion_id,
            CurrentWallet.user_account,
            CurrentWallet.chainId,
            "MetaMask"
          );
           toast.update(update_form, {
            render: "Purchased",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
          navigate("/collection/"+ medallion_id);
        } catch (error) {
          toast.update(update_form, {
            render: error.message,
            type: "success",
            isLoading: false,
            autoClose: true,
          });
        }
      }
    } catch (error) {
    }
  };
  const handleModalOpen = () => {
    dispatch({
      type: Modal_Opened,
    });
  };
  //Wallet Connect
  const ConnectToWalletConnect = async () => {
    handleModalClose();
    try {
      // Create a connector
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
      });

      if (!connector.connected) {
        // create new session
        await connector.createSession();
      }

      connector.on("connect", (error, payload) => {
        if (error) {
          throw error;
        }
        current_wallet.user_account = payload.params[0].accounts[0];
        current_wallet.chainId = payload.params[0].chainId;
        current_wallet.wallet_name = "WalletConnect";
        UpdateState(current_wallet);
      });

      connector.on("session_update", (error, payload) => {
        if (error) {
          throw error;
        }
        current_wallet.user_account = payload.params[0].accounts[0];
        current_wallet.chainId = payload.params[0].chainId;
        current_wallet.wallet_name = "WalletConnect";
        UpdateState(current_wallet);
      });

      connector.on("disconnect", (error, payload) => {
        if (error) {
          throw error;
        }
        sessionStorage.removeItem("current_wallet");
        dispatch({
          type: CurrentWallet_DisConnected,
        });
      });
    } catch (error) {
    }
  };

  const medallionPayConnect = () => {
    document.body.classList.add('modal-open');
    setShowModal(true);
  };

  const handleModalClose = () => {
    document.body.classList.remove('modal-open');
    dispatch({
      type: Modal_Closed,
    });
  };

  return (
    <div className="flex flex-col">
      
      <div className="my-5 self-center">
        <button
          style={{ height: "50px", fontSize: "17px", fontWeight: "600" }}
          className="border p-2 rounded-md  cursor-pointer flex flex-row justify-center text-center items-center "
          onClick={() => medallionPayConnect()}
        >
          <img
            src={medallionpaylogo}
            alt="medalianpay"
            style={{ height: "40px", width: "40px" }}
          />
          MEDALLION PAY
        </button>
      </div>
      <div className="my-2 self-center">
        <img
          src={MetaMaskLogo}
          alt="Metamask"
          style={{ height: "50px" }}
          className="border p-2 rounded-md  cursor-pointer"
          onClick={() => ConnectToMetaMask(medallion_id)}
        />
      </div>

      {showactivity && (
        <MedalianPay
          setShowModal={setShowModal}
          handleModalClose={handleModalClose}
          medid={medallion_id}
        />
      )}
    </div>
  );
}

export default ShowWallets;
