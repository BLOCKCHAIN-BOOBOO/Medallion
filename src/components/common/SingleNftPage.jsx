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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ViewLessContent, ViewMoreContent } from "../../Utils/Helper";


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
const [display,setDisplay]=useState();
  const [ContentControl, SetContentControl] = useState(true);

  const GetMemberShipData = (ELITE_STATUS) => {
    const MemberShipObject = MemberShip.memberships;
    return MemberShipObject[ELITE_STATUS]
      ? MemberShipObject[ELITE_STATUS]
      : "No Status";
  };

  //Handle Buy Medallion
  const handleBuy = async (medallion_id) => {
    document.body.classList.add('modal-open');
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

  const displayCard=(type)=>{
  console.log("Calling")
  setDisplay(type);
}

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
      const Records = await GetSingleMedallionData(MedallionId, Token,"marketplace");
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
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  
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
          <div className="mx-auto ">
          <div className=" mx-auto  p-1 md:p-8 xl:p-8 text-left">
          <div className="desktop-login-card mx-auto p-1 md:p-8 xl:p-8 text-left h-auto ">
                  <div className="mobile-login-card">
                <div className=" corner-wave2 collection-medallion-card-background flex-start">
                <div className=" corner-wave1 flex-start collection-medallion-second-card">
                </div>
</div>
                <div className="flex xl:flex-row md:flex-row sm:flex-col flex-col img-position">

            {/*Content Start*/}
            {SingleRecord && (
              // <div className="flex flex-col justify-between xl:flex xl:flex-col xl:justify-between xl:mb-0 py-0 mx-4 sm:mx-0 xl:mx-0">
                <CanvasElement
                  medallion_name={SingleRecord.name}
                  medallion_elite_status={SingleRecord.elite_status}
                  // canvas_width="500"
                  // canvas_height="500"
                  element_size="small"
                />
              // </div>
            )}
            {SingleRecord && (
              <div className="flex flex-col self-center justify-center">
                <MedallionData SingleRecord={SingleRecord} />
               
               <div className="flex xl:self-start md:self-start self-center text-center justify-center"> 
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
              </div>
            )}

            {/*Content End*/}
          </div>
          </div>
<Tabs className="w-full">
<div className="w-full">
<TabList className="border-b-2 flex xl:flex-row md:flex-row sm:flex-row flex-row py-1 self-start text-start justify-start">
                    {/* <Tab></Tab> */}
                    <Tab className="xl:px-4 md:px-2 sm:px-1 px-1 cursor-pointer">
                      <a className=" m-2  md:mr-0 sub-tabs-text" >
                       General Info
                      </a>
                    </Tab>
                 
                    <Tab className="xl:px-4 md:px-2 sm:px-1 px-1 cursor-pointer">
                      <a className="m-2 md:mr-0 sub-tabs-text" >
                        Medallion Activity
                      </a>
                    </Tab>
                  </TabList>
                  {/* <TabPanel></TabPanel> */}


  <TabPanel className="xl:px-10 md:px-0 sm:px-0 px-0">
<div className="">
  <div className="py-2">
<span className="dashboard-tab-header">Description</span>
                  {ContentControl ? (
        <p className="py-2 text-sm terms-text">
          {ViewLessContent(GetMemberShipData(SingleRecord&&SingleRecord.elite_status), 200)}
          <button
            className="footer-text"
            onClick={() => SetContentControl(false)}
          >
            ...View More
          </button>
        </p>
      ) : (
        <p className="py-2 text-sm terms-text">
          {ViewMoreContent(GetMemberShipData(SingleRecord&&SingleRecord.elite_status))}
          <button
            className="footer-text"
            onClick={() => SetContentControl(true)}
          >
            View Less
          </button>
        </p>
      )}
</div>
</div>
</TabPanel>

<TabPanel className="xl:px-10 md:px-10 sm:px-10 px-1">
                  {/* <div className=" " > */}
                  {/* buy-card */}
                    <div className="py-2">
                      <p className="text-xl font-semibold text-left">Medallion Activity</p>
                       
                    <MedallionActivity
                        Medallion_Id={SingleRecord&&SingleRecord.medallion_ID}
                      />
                    </div>
                
                    {/* </div> */}
                  </TabPanel>

</div>

</Tabs>

          </div>
        </div>
        </div>
        </section>
      </div>
    </div>
  );
}

export default SingleNftPage;
