import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MemberShip from "./../../EliteText.json";
import ReactLoading from "react-loading";
import CanvasElement from "./CanvasElement";
import { Purchase } from "../Dashboard/Buy";
import Modal from "./Modal";
import ShowWallets from "../Wallets/ShowWallets";
import { Modal_Closed, Modal_Opened } from "../../store/ModalReducer";
import { GetSingleMedallionData } from "../../Utils/Methods";
import MedallionData from "../NftPage/MedallionData";
import MedallionActivity from "../NftPage/MedallionActivity";
import { ValidateToken } from "../../Utils/Helper";
import { GetUserInfo } from "../../Utils/Methods";
import { toast, ToastContainer } from "react-toastify";


function SingleNftPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { MedallionId } = useParams();
  const Token = useSelector((state) => state.user.token);
  const [userinfo, setUserInfo] = useState();
  
  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  const [SingleRecord, SetSingleRecord] = useState(null);
  // const [Status, SetStatus] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const [ModalTitle, SetModalTitle] = useState(null);
  const [ModalBody, SetModalBody] = useState(null);
  const [HideCloseOption, SetHideCloseOption] = useState(true);
  // const [TransactionStatus, SetTransactionStatus] = useState(false);

  const GetMemberShipData = (ELITE_STATUS) => {
    const MemberShipObject = MemberShip.memberships;
    return MemberShipObject[ELITE_STATUS]
      ? MemberShipObject[ELITE_STATUS]
      : "No Status";
  };

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

  //Close Modal
  const handleModalClose = () => {
    dispatch({
      type: Modal_Closed,
    });
  };

  const HandleMedallionData = async () => {
    SetLoading(true);
    try {
      const Records = await GetSingleMedallionData(MedallionId, Token);
      Records.length && SetSingleRecord(...Records);
      console.log({ ...Records });
    } catch (error) {
      toast.error(error);
    } finally {
      SetLoading(false);
    }
  };

  const HandleGetUserInfo = async () => {
    SetLoading(true);
    try {
      const UserInfoResponse = await GetUserInfo(Token);
      setUserInfo(UserInfoResponse);
    } catch (error) {
      toast.error(error);
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    HandleMedallionData();
    HandleGetUserInfo(Token);
  }, []);

  


  return (
    <div>
      <div className="market-section-color mt-16 sm:mt-16 md:mt-20 lg:mt-20">
      <ToastContainer />
        <section
          className="market-background relative py-20 xl:py-20"
          style={{ minHeight: "800px" }}
        >
          {ModalTitle && ModalBody && (
            <Modal hide_close_button={HideCloseOption && HideCloseOption}>
              <div>
                <h1 className="text-3xl p-4 ">{ModalTitle && ModalTitle}</h1>
                <div className="flex flex-col p-4">
                  <p className="text-bold text-xl py-3">
                    {ModalBody && ModalBody}
                  </p>
                </div>
              </div>
            </Modal>
          )}

          <div className="w-full flex flex-col">
            <div className="self-center">
              {Loading && <ReactLoading type="bars" color="#fff" />}
            </div>
          </div>
          <div className="container mx-auto flex flex-col xl:flex xl:flex-row xl:justify-between align">
            {/*Content Start*/}
            {SingleRecord && (
              <div className="flex flex-col justify-between xl:flex xl:flex-col xl:justify-between xl:mb-0 py-0 mx-4 sm:mx-0 xl:mx-0">
                <CanvasElement
                  medallion_name={SingleRecord.name}
                  medallion_elite_status={SingleRecord.elite_status}
                  canvas_width="500"
                  canvas_height="500"
                  element_size="large"
                />
              </div>
            )}
            {SingleRecord && (
              <div className="buy-card lg:w-2/5 p-6 md:p-8 text-left">
                <MedallionData SingleRecord={SingleRecord} />
                <button
                  className="active-button md:mr-2 px-10 py-1 font-bold"
                  onClick={() => {
                    Token
                      ? handleBuy(SingleRecord.medallion_ID)
                      : navigate("/login");
                  }}
                >
                  BUY NOW
                </button>
              </div>
            )}

            {/*Content End*/}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SingleNftPage;
