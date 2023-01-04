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

function NftPage() {
  const { MedallionId } = useParams();
  const Token = useSelector((state) => state.user.token);
  const [Loading, SetLoading] = useState(false);
  const [SingleRecord, SetSingleRecord] = useState(null);

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


                <div className="container mx-auto flex flex-col xl:flex xl:flex-row xl:justify-between align">
            {SingleRecord && (
              <CanvasElement
                medallion_name={SingleRecord.name}
                medallion_elite_status={SingleRecord.elite_status}
                canvas_width="500"
                canvas_height="500"
                element_size="large"
              />
            )}
            <div className="buy-card-width xl:w-2/5 md:w-4/5 sm:w-full w-full p-6 md:p-8 text-left">
                <div className="buy-card w-full p-6 md:p-8 text-left h-auto ">
                <MedallionData SingleRecord={SingleRecord} />
                  <TabList className="flex xl:flex-row md:flex-row sm:flex-col flex-col py-10 self-center text-center justify-center">
                    <Tab></Tab>
                    <Tab>
                      <button className="rounded-3xl m-1 btn-sign md:mr-0 px-10 py-1 font-bold">
                        List On MarketPlace
                      </button>
                    </Tab>
                    <Tab>
                      <button className="rounded-3xl m-1 btn-sign md:mr-0 px-10 py-1 font-bold">
                        Gift Medallion
                      </button>
                    </Tab>
                    <Tab>
                      <button className="rounded-3xl m-1 btn-sign md:mr-0 px-10 py-1 font-bold">
                        Medallion Activity
                      </button>
                    </Tab>
                  </TabList>
                  </div>
                  </div>
                  </div>
                 

                 
                {/* <Tabs> */}
                <TabPanel></TabPanel>
                  <TabPanel className="xl:px-40 md:px-40 sm:px-10 px-8">
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
                  </TabPanel>
                  <TabPanel className="xl:px-40 md:px-40 sm:px-10 px-1">
                  <div className="buy-card mt-10 mb-10 w-full p-6 md:p-8 text-left" >
                    <div>
                      <p className="text-xl font-semibold">Gift Medallion</p>
                      <TransferMedallion
                        MedallionID={SingleRecord.medallion_ID}
                        HandleMedallionData={() => HandleMedallionData()}
                      />
                    </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="xl:px-40 md:px-20 sm:px-10 px-1">
                  <div className="buy-card mt-10 mb-10 w-full p-6 md:p-8 text-center" >
                    <div className="py-2">
                      <p className="text-xl font-semibold">Medallion Activity</p>
                      <MedallionActivity
                        Medallion_Id={SingleRecord.medallion_ID}
                      />
                    </div>
                    </div>
                  </TabPanel>
                {/* </Tabs> */}
               
                </Tabs>


               

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
