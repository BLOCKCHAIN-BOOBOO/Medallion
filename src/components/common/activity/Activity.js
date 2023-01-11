import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, GET_ACTIVITIES_BY_USER } from "../../../api";
import GetFunction from "../GetFunction";
import HandleError from "../HandleError";
import TitleBanner from "../TitleBanner";
import "../../../../src/theme/input.css";

import "../../../theme/output.css";

import ReactLoading from "react-loading";

const Activity = () => {
  const [records, setRecords] = useState();
  const [Loading, SetLoading] = useState(false);
  const [email, setEmail] = useState();

  const token = useSelector((state) => state.user.token);
  const ResponseObject = {
    data: null,
    status: null,
    message: null,
  };

  const getActivity = async () => {
    SetLoading(true);
    const uemail = JSON.parse(window.sessionStorage.getItem("princess_store"));
    setEmail(uemail);
    // console.log(email.email);
    const FilterDataUrl = BASE_URL + GET_ACTIVITIES_BY_USER;
    const { result, RequestResolved } = await GetFunction(FilterDataUrl, token);
    console.log(result, RequestResolved);
    if (RequestResolved) {
    }
    const { ResultType, Message } = HandleError(result);
    if (ResultType === "success") {
      const record =
        result?.data?.data?.records.length > 0
          ? result?.data?.data?.records
          : null;

      SetLoading(false);
      setRecords(record);
    } else {
      ResponseObject.status = "error";
      ResponseObject.message = Message;
      ResponseObject.data = result;
      throw ResponseObject;
    }
  };
  useEffect(() => {
    getActivity();
  }, []);
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div id="content-wrap">
      <section className=" py-10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 md:pt-10 md:pb-4 lg:pt-10 lg:pb-4 relative">
      {/* marketplace-section */}
        <div className="container mx-auto flex flex-col md:flex md:flex-col lg:flex lg:flex-col align">
          <TitleBanner title="Activity" />
        </div>
      </section>
      <div className="market-section-color">
        <section className="market-background relative flex justify-center self-center text-center pt-10 md:pt-10 sm:pt-10 xl:pt-10">

          {Loading ? (
            <ReactLoading type="bars" color="#fff" />
          ) : (
            <>
              {records ? (
                <div className="container align">
                <div className="rounded-2xl bg-white h-96 overflow-y-auto p-3">
                  <table className="table-auto activity-table w-full bg-white">
                    <thead>
                      <tr>
                        <th className="p-3 font-bold">Medallion ID</th>
                        <th className="p-3 font-bold">From</th>
                        <th className="p-3 font-bold">To</th>
                        <th className="p-3 font-bold">Action</th>
                        <th className="p-3 font-bold">Amount</th>
                        <th className="p-3 font-bold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records?.map((each_row, index) => {
                        return (
                          <tr key={index} className="border-b-2">
                            <td className=" p-2">
                              {each_row.medallion_ID}
                            </td>
                            <td className=" p-2">
                              {each_row.from_email}
                            </td>
                            <td className=" p-2">{each_row.to_email}</td>
                            <td className=" p-2">
                              {each_row.action === "Purchase" &&
                              each_row.to_email === email.email
                                ? "Bought"
                                : each_row.action === "Purchase" &&
                                  each_row.from_email === email.email
                                ? "Sold"
                                : each_row.action}
                            </td>
                            {/* <td className="border p-2">
                              {each_row.price ? each_row.price : "-"}{" "}
                              {each_row.price ? "USD" : "-"}{" "}
                            </td> */}
                            <td className=" p-2">
                              {each_row.price &&
                              each_row.payment_method === "CRYPTO"
                                ? (each_row.price/1000000000000000000) + " ETH"
                                : each_row.price &&
                                  each_row.payment_method === "MED_PAY"
                                ? each_row.price + " USD"
                                : "--"}
                            </td>

                            <td className=" p-2">
                              {each_row?.updatedAt.split("T")[0]}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                </div>
              ) : (
                <div className="text-white text-bold">NO ACTIVITY</div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Activity;
