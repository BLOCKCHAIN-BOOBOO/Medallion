import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetSingleMedallionData } from "../../Utils/Methods";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import CanvasElement from "../common/CanvasElement";
import ReactLoading from "react-loading";
import EditSaleStatus from "./EditSaleStatus";
import TransferMedallion from "./TransferMedallion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MedallionData from "./MedallionData";
import MedallionActivity from "./MedallionActivity";

import { ViewLessContent, ViewMoreContent } from "../../Utils/Helper";
import MemberShip from "../../EliteText.json";
import { NavLink } from "react-router-dom";

function NftPage() {
  const { MedallionId } = useParams();
  const Token = useSelector((state) => state.user.token);
  const [Loading, SetLoading] = useState(false);
  const [SingleRecord, SetSingleRecord] = useState(null);
const [display,setDisplay]=useState();
  
  const [ContentControl, SetContentControl] = useState(true);

  const GetMemberShipData = (ELITE_STATUS) => {
    const MemberShipObject = MemberShip.memberships;
    return MemberShipObject[ELITE_STATUS];
  };
const displayCard=(type)=>{
  setDisplay(type);
}
  const HandleMedallionData = async () => {
    SetLoading(true);
    try {
      const Records = await GetSingleMedallionData(MedallionId, Token);
      Records.length && SetSingleRecord(...Records);
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
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="market-section-color mt-16 sm:mt-16 md:mt-20 lg:mt-20">
        <section
          className="market-background relative py-20 xl:py-20"
          style={{ minHeight: "800px" }}
        >
          <div className="w-full flex flex-col">
            <div className="self-center">
              {Loading && <ReactLoading type="bars" color="#fff" />}
            </div>
          </div>

          {/* <div className="container mx-auto flex flex-col xl:flex xl:flex-row xl:justify-between align">
            {SingleRecord && (
              <CanvasElement
                medallion_name={SingleRecord.name}
                medallion_elite_status={SingleRecord.elite_status}
                canvas_width="500"
                canvas_height="500"
                element_size="large"
              />
            )} */}

            {SingleRecord && (
              <div className=""> 
                <Tabs>
                <div className="container mx-auto flex flex-row xl:flex xl:flex-row xl:justify-between align">
         
            <div className=" mx-auto p-6 md:p-8 text-left">
            {/* buy-card-width xl:w-2/5 md:w-4/5 sm:w-full w-full p-6 md:p-8 text-left   */}
                <div className="login-card mx-auto p-6 md:p-8 text-left h-auto ">
                {/* buy-card  */}
                <div className="flex flex-row">
                {SingleRecord && (
              <CanvasElement
                medallion_name={SingleRecord.name}
                medallion_elite_status={SingleRecord.elite_status}
                // canvas_width="500"
                // canvas_height="500"
                element_size="small"
              />
            )}

<div className="flex flex-col self-center justify-center ">
                <MedallionData SingleRecord={SingleRecord} />
                  {/* <TabList className="flex xl:flex-row md:flex-row sm:flex-col flex-col py-4 self-center text-center justify-center"> */}
                    {/* <Tab></Tab> */}
                    <div className="flex xl:flex-row md:flex-row sm:flex-col flex-col py-4 self-center text-center justify-center">
                    {/* <Tab className="m-2"> */}
                      <button className=" m-1  md:mr-0 active-button" onClick={e=>displayCard("list marketplace")}>
                        List On MarketPlace
                      </button>
                    {/* </Tab>
                    <Tab className="m-2"> */}
                      <button className=" m-1  md:mr-0 active-button" onClick={e=>displayCard("Gift Medallion")}>
                        Gift Medallion
                      </button>
                      </div>
                    {/* </Tab> */}
                    {/* <Tab>
                   
                      <button className="m-1 md:mr-0 active-button">
                        Medallion Activity
                      </button>
                    </Tab> */}
                  {/* </TabList> */}
                  </div>
                  </div>






{/* <Tabs> */}
<div className="w-full">
<TabList className="border-b-2 flex xl:flex-row md:flex-row sm:flex-col flex-col py-1 self-start text-start justify-start">
                    {/* <Tab></Tab> */}
                    <Tab className="px-4">
                      <a className=" m-2  md:mr-0 sub-tabs-text" onClick={e=>displayCard("")}>
                       General Info
                      </a>
                    </Tab>
                 
                    <Tab className="px-4">
                      <a className="m-2 md:mr-0 sub-tabs-text" onClick={e=>displayCard("")}>
                        Medallion Activity
                      </a>
                    </Tab>
                  </TabList>
                  {/* <TabPanel></TabPanel> */}
  <TabPanel className="xl:px-10 md:px-0 sm:px-10 px-8">
<div className="mt-10 mb-10 p-6 md:p-8">
  <div className="py-2">
<span className="dashboard-tab-header">Description</span>
                  {ContentControl ? (
        <p className="py-2 text-sm terms-text">
          {ViewLessContent(GetMemberShipData(SingleRecord.elite_status), 200)}
          <button
            className="footer-text"
            onClick={() => SetContentControl(false)}
          >
            ...View More
          </button>
        </p>
      ) : (
        <p className="py-2 text-sm terms-text">
          {ViewMoreContent(GetMemberShipData(SingleRecord.elite_status))}
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
                  <div className=" mt-10 mb-10 w-full p-6 md:p-8 text-center" >
                  {/* buy-card */}
                    <div className="py-2">
                      <p className="text-xl font-semibold text-left">Medallion Activity</p>
                      <MedallionActivity
                        Medallion_Id={SingleRecord.medallion_ID}
                      />
                    </div>
                    </div>
                  </TabPanel>

</div>
{/* </Tabs> */}
                {/* <Tabs> */}
                  {/* <TabPanel className="xl:px-40 md:px-40 sm:px-10 px-8">
                  <div className="buy-card mt-10 mb-10 w-full p-6 md:p-8 text-left" >
                    <div>
                      <p className="text-xl font-semibold">List and Unlist Medallion</p>
                      <EditSaleStatus
                        MedallionID={SingleRecord.medallion_ID}
                        sale_status={SingleRecord.status}
                        price={SingleRecord.price/10000000000000000}
                        currency={SingleRecord.currency}
                        HandleMedallionData={() => HandleMedallionData()}
                      />
                    </div>
                    </div>
                  </TabPanel> */}
                 
                  {/* <TabPanel className="xl:px-40 md:px-40 sm:px-10 px-1">
                  <div className="buy-card mt-10 mb-10 w-full p-6 md:p-8 text-left" >
                    <div>
                      <p className="text-xl font-semibold">Gift Medallion</p>
                      <TransferMedallion
                        MedallionID={SingleRecord.medallion_ID}
                        HandleMedallionData={() => HandleMedallionData()}
                      />
                    </div>
                    </div>
                  </TabPanel> */}
                  {/* </Tabs> */}
                 
                  </div>
                  </div>
                  </div>
                
                {/* </Tabs> */}
               
                </Tabs>

{display === "list marketplace"&&
(<div className="mt-10 mb-10 w-full p-6 md:p-8 text-center" >
  {/* buy-card  */}
                    <div>
                      <p className="text-xl font-semibold">List and Unlist Medallion</p>
                      <EditSaleStatus
                        MedallionID={SingleRecord.medallion_ID}
                        sale_status={SingleRecord.status}
                        price={SingleRecord.price/10000000000000000}
                        currency={SingleRecord.currency}
                        HandleMedallionData={() => HandleMedallionData()}
                      />
                    </div>
                    </div>
                    )}

              {display === "Gift Medallion"&&
(   <div className="mt-10 mb-10 w-full p-6 md:p-8 text-center justify-center self-center" >
  {/* buy-card  */}
<div>
  <p className="text-xl font-semibold">Gift Medallion</p>
  <TransferMedallion
    MedallionID={SingleRecord.medallion_ID}
    HandleMedallionData={() => HandleMedallionData()}
  />
</div>
</div>)}

                {/*Editing Features start*/}

                {/*Editing Features end*/}
              </div>
            )}
          {/* </div> */}

          
        </section>
      </div>
    </div>
  );
}

export default NftPage;
