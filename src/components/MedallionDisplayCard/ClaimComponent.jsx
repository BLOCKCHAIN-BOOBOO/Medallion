import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Modal_Opened } from "../../store/ModalReducer";
import { ValidateToken } from "../../Utils/Helper";
import { ClaimNft, GetUserInfo } from "../../Utils/Methods";
import Modal from "../common/Modal";
import ShowWallets from "../Wallets/ShowWallets";
import "./../../theme/output.css";
import {
  CurrentWallet_Connected,
  CurrentWallet_DisConnected,
} from "../../store/CurrentWalletReducer";
import { MetaMaskUserAccount, ConnectedChainId } from "../Wallets/MetaMask";
import { toast } from "react-toastify";

function ClaimComponent({ MedallionId, Activitylength }) {
  const Token = useSelector((state) => state.user.token);
  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ModalTitle, SetModalTitle] = useState(null);
  const [ModalBody, SetModalBody] = useState(null);
  const [HideCloseOption, SetHideCloseOption] = useState(true);
  const [userinfo, setUserInfo] = useState();

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

  //Claim NFT
  const handleClaimNft = async (MedalloionId) => {
    if (Token && ValidateToken()) {
      const update_form = toast.loading("Processing");
          try {
            const ClaimNftResponse = await ClaimNft(
              MedalloionId,
              Token
            );
            toast.update(update_form, {
              render: "CLAIMED",
              type: "success",
              isLoading: false,
              autoClose: true,
            });
            window.location.reload(true);
          } catch (error) {
            toast.update(update_form, {
              render: error.message,
              type: "success",
              isLoading: false,
              autoClose: true,
            });
          }
    } else {
      console.log("Session expired");
      navigate("/login");
    }
  };

  //Open Modal
  const handleModalOpen = () => {
    dispatch({
      type: Modal_Opened,
    });
  };

  const HandleGetUserInfo = async (Token) => {
    // SetLoading(true);
    try {
      const UserInfoResponse = await GetUserInfo(Token);
      setUserInfo(UserInfoResponse);
    } catch (error) {
      toast.error(error);
    } finally {
      // SetLoading(false);
    }
  };

  useEffect(() => {
    HandleGetUserInfo(Token);
  }, [Token]);

  return (
    <div>
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
      {Activitylength > 1 ? (
        <button
          onClick={() => handleClaimNft(MedallionId)}
          className="text-white rounded-3xl -mt-4 btn-sign md:mr-0 px-10 py-1 font-bold"
        >
          ACCEPT
        </button>
      ) : (
        <button
          onClick={() => handleClaimNft(MedallionId)}
          className="text-white rounded-3xl -mt-4 btn-sign md:mr-0 px-10 py-1 font-bold"
        >
          CLAIM
        </button>
      )}
    </div>
  );
}

export default ClaimComponent;
