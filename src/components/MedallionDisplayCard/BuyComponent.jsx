import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Modal_Opened } from "../../store/ModalReducer";
import { ValidateToken } from "../../Utils/Helper";
import { GetUserInfo } from "../../Utils/Methods";
import Modal from "../common/Modal";
import { Purchase } from "../Dashboard/Buy";
import ShowWallets from "../Wallets/ShowWallets";
import { toast } from "react-toastify";

function BuyComponent({ MedallionId }) {
  const Token = useSelector((state) => state.user.token);
  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ModalTitle, SetModalTitle] = useState(null);
  const [ModalBody, SetModalBody] = useState(null);
  const [HideCloseOption, SetHideCloseOption] = useState(true);
  const [medid, setMedid] = useState();
  const [userinfo, setUserInfo] = useState();

  //Handle Buy Medallion
  const handleBuy = async (medallion_id) => {
    if (Token && ValidateToken()) {
      if (userinfo.address === null || userinfo.address === "") {
        toast.error("error");

        navigate("/user-dashboard/wallet ");
      } else {
        SetModalTitle("Connect to Wallet");
        SetModalBody(<ShowWallets medallion_id={medallion_id} />);

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

  const HandleGetUserInfo = async (Token) => {
    // SetLoading(true);
    try {
      const UserInfoResponse = await GetUserInfo(Token);
      setUserInfo(UserInfoResponse);
    } catch (error) {
      // toast.error(error);
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
      <button
        className="claim-button md:mr-2 px-10 py-1 font-bold"
        onClick={() => handleBuy(MedallionId)}
      >
        BUY NOW
      </button>
    </div>
  );
}

export default BuyComponent;
