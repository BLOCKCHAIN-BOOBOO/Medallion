import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import CanvasElement from "./CanvasElement";
import { Purchase } from "../Dashboard/Buy";
import { ClaimNft } from "../../Utils/Methods";
import Modal from "./Modal";
import ShowWallets from "../Wallets/ShowWallets";
import { Modal_Closed, Modal_Opened } from "../../store/ModalReducer";
import { ChangeSaleText, ValidateToken } from "../../Utils/Helper";

function DisplayCard(props) {
  const Token = useSelector((state) => state.user.token);
  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  const [Claimed, SetClaimed] = useState(props.medallion.claimed);
  const [ModalTitle, SetModalTitle] = useState(null);
  const [ModalBody, SetModalBody] = useState(null);
  const [HideCloseOption, SetHideCloseOption] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ViewUrl =
    props.single_nft_view_type === "market"
      ? `/view-single-nft/${props.medallion.medallion_ID}`
      : `/collection/${props.medallion.medallion_ID}`;

  //Handle Buy Medallion
  const handleBuy = async (medallion_id) => {
    if (CurrentWallet && CurrentWallet.user_account) {
      SetModalTitle("Medallion Transaction in Progress");
      SetModalBody("Please don't close window or refresh page..");
      SetHideCloseOption(true);
      handleModalOpen();
      try {
        const PruchaseResponse = await Purchase(
          Token,
          medallion_id,
          CurrentWallet.user_account,
          CurrentWallet.chainId,
          CurrentWallet.wallet_name
        );
        SetModalTitle("Medallion Transaction Success");
        SetModalBody(PruchaseResponse.message);
        SetHideCloseOption(false);
        window.location.reload();
      } catch (error) {
        SetModalTitle("Medallion Transaction Failed");
        SetModalBody(error.message);
        SetHideCloseOption(false);
      }
    } else {
      SetModalTitle("Connect to Wallet");
      SetModalBody(<ShowWallets />);
      SetHideCloseOption(false);
      handleModalOpen();
    }
  };

  //Claim NFT
  const handleClaimNft = async (MedalloionId) => {
    if (Token && ValidateToken()) {
      if (CurrentWallet && CurrentWallet.user_account) {
        SetModalTitle("Medallion Transaction in Progress");
        SetModalBody("Please don't close window or refresh page..");
        SetHideCloseOption(true);
        handleModalOpen();
        try {
          SetModalTitle("Claiming Medallion in Progress");
          SetModalBody("Please don't close window or refresh page..");
          SetHideCloseOption(true);
          handleModalOpen();
          const ClaimNftResponse = await ClaimNft(
            MedalloionId,
            Token
          );
          SetModalTitle("Medallion Claimed Successfully");
          SetModalBody(ClaimNftResponse);
          SetHideCloseOption(false);
          window.location.reload();
        } catch (error) {
          SetModalTitle("Medallion Claiming Failed");
          SetModalBody(error.message);
          SetHideCloseOption(false);
        }
      } else {
        SetModalTitle("Connect to Wallet");
        SetModalBody(<ShowWallets />);
        SetHideCloseOption(false);
        handleModalOpen();
      }
    } else {
      navigate("/login");
    }
  };

  //Open Modal
  const handleModalOpen = () => {
    dispatch({
      type: Modal_Opened,
    });
  };

  //Close Modal
  const handleModalClose = () => {
    dispatch({
      type: Modal_Closed,
    });
  };

  return (
    <div className="buy-card p-6 md:p-8 text-left">
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

      <div className="overflow-hidden mb-5 self-center">
        {props.medallion.name && (
          <CanvasElement
            medallion_name={props.medallion.name}
            medallion_elite_status={props.medallion.elite_status}
            element_size="small"
            inner_ring={props.medallion.inner_ring}
          />
        )}
        {/* {<ReactLoading type="bars" color="#fff" />} */}
        {/* <img
      src={BASE_URL + "/" + props.medallion.model_url}
      alt="Medallion"
      onLoad={() => SetImageLoaded(true)}
      height="300"
      width="300"
      className="mx-auto mb-5"
    /> */}
      </div>

      <div className="pb-2">
        <span> Medallion ID : #{props.medallion.medallion_ID}</span>
        <h3 className="text-2xl font-bold mb-1">{props.medallion.name}</h3>
        <span>Membership Status : {props.medallion.elite_status}</span>
        <br />
        {props.show_status && (
          <span>Status : {ChangeSaleText(props.medallion.status)}</span>
        )}
      </div>
      <hr />
      <div className="flex justify-between">
        <p>Sale Price</p>
        <p className="font-bold">
          {/* {props.medallion.currency === "reth" ? "ETH" : "MATIC"}{" "} */}
          ETH {props.medallion.price}
        </p>
      </div>
      <div className="text-center mt-4 full-width">
        {props.show_view && (
          <Link
            to={ViewUrl}
            className="view-button self-center"
          >
            VIEW
          </Link>
        )}

        {props.show_claim && Claimed && (
          <Link
            to={ViewUrl}
            className="view-button self-center"
          >
            VIEW
          </Link>
        )}

        {props.show_buy && (
          <button
            className="active-button md:mr-2 px-10 py-1"
            onClick={() => {
              Token
                ? handleBuy(props.medallion.medallion_ID)
                : navigate("/login");
            }}
          >
            BUY NOW
          </button>
        )}
        {props.show_claim && !Claimed && (
          <Link
            to="#"
            // disabled={Processing ? true : false}
            onClick={() => handleClaimNft(props.medallion.medallion_ID)}
            className="text-white rounded-3xl btn-sign md:mr-0 px-10 py-1 font-bold"
          >
            Claim
          </Link>
        )}
      </div>
    </div>
  );
}

export default DisplayCard;
