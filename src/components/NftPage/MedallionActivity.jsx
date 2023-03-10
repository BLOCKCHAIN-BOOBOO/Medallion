import { useEffect, useState } from "react";
import { GetMedallionActivity } from "../../Utils/Methods";
import { useSelector } from "react-redux";
import { BASE_URL, GET_ACTIVITIES_BY_USER } from "../../api";
import HandleError from "../common/HandleError";
import GetFunction from "../common/GetFunction";

function MedallionActivity({ Medallion_Id }) {
  const Token = useSelector((state) => state.user.token);
  const [Activity, SetActivity] = useState(null);
  const [email, setEmail] = useState();

  const handleMedallionActivity = async (Medallion_Id, Token) => {
    const uemail = JSON.parse(window.sessionStorage.getItem("princess_store"));
    setEmail(uemail);
    try {
      const ActivityResponse = await GetMedallionActivity(Medallion_Id, Token);
      if (ActivityResponse && ActivityResponse.length) {
        SetActivity(ActivityResponse);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    handleMedallionActivity(Medallion_Id, Token);
  }, [Medallion_Id, Token]);

  return (
    <div className="flex w-full overflow-y-auto overflow-x-auto mt-2">
      {Activity && (
        // <div className="h-60 bg-white overflow-y-auto overflow-x-auto">            xl:px-40 md:px-20 sm:px-20 px-2 
          <table className="table-auto w-full activity-table  self-start text-left float-left">
            <thead>
              <tr className="text-sm">
                <th className="p-2">S.No</th>
                <th className="p-2">From</th>
                <th className="p-2">To</th>
                <th className="p-2">Amount</th>
                <th className="p-2 ">Type</th>
                <th className="p-2 ">Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {Activity.map((each_row, index) => {
                return (
                  <tr key={index} className="text-sm">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{each_row.from_email}</td>
                    <td className="border p-2">{each_row.to_email}</td>
                    {/* <td className="border p-2">
                      {each_row.price ? each_row.price : "-"}{" "}
                      {each_row.price ? "USD" : "-"}{" "}
                    </td> */}
                    <td className="border p-2">
                      {each_row.price && each_row.payment_method === "CRYPTO"
                        ? (each_row.price/1000000000000000000) + " ETH"
                        : each_row.price &&
                          each_row.payment_method === "MED_PAY"
                        ? each_row.price + " USD"
                        : "--"}
                    </td>
                    <td className="border p-2">
                      {each_row.action === "Purchase" &&
                      each_row.to_email === email.email
                        ? "Bought"
                        : each_row.action === "Purchase" &&
                          each_row.from_email === email.email
                        ? "Sold"
                        : each_row.action}
                    </td>
                    <td className="border p-2">
                      {each_row.updatedAt.split("T")[0]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        // </div>
      )}
    </div>
  );
}

export default MedallionActivity;
