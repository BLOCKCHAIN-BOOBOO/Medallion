import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MedallionDataUpdate } from "../../Utils/Methods";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { DollarsToETH } from "../../Utils/Helper";
import { useNavigate } from "react-router";


const SelectClass =
  "block w-full px-3 py-1.5 text-base bg-clip-padding bg-no-repeat  transition ease-in-out m-0 mb-5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

function EditSaleStatus(props) {
  const Token = useSelector((state) => state.user.token);
  const [SaleStatus, SetSaleStatus] = useState({
    sale_status: props.sale_status,
  });
  const [Currency, SetCurrency] = useState({ currency: props.currency });
  const [Price, SetPrice] = useState({ medallion_price: props.price });
  const [PricingForm, SetPricingForm] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  const UpdateHandler = async (e) => {
    e.preventDefault();
    SetLoading(true);
    const update_form = toast.loading("Updating Medallion Data");
    try {
      const UpdateResponse = await MedallionDataUpdate(
        props.MedallionID,
        SaleStatus.sale_status,
        Currency.currency,
        Price.medallion_price,
        Token
      );
      props.HandleMedallionData();
      toast.update(update_form, {
        render: UpdateResponse,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      // navigate("/collection")
      setTimeout(() => {
        navigate("/collection")
      }, 2000);
     
      
    } catch (error) {
      toast.update(update_form, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: true,
      });
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    SetPricingForm(() => {
      return SaleStatus.sale_status === "on_sale" ? true : false;
    });
  }, [SaleStatus.sale_status]);

  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="self-center">
          {Loading && <ReactLoading type="bars" color="#fff" />}
        </div>
      </div>
      <form onSubmit={UpdateHandler} className="mt-10 self-center text-center inline-block mx-auto flex flex-col">
        <div className="flex-col flex w-full mx-auto">
       <div className="mx-auto w-full inline-block ">
        <select
          className={SelectClass}
          onChange={(e) =>
            SetSaleStatus({ ...SaleStatus, sale_status: e.target.value })
          }
        >
          <option
            value="on_sale"
            selected={SaleStatus.sale_status === "on_sale" ? true : false}
          >
            On Sale
          </option>
          <option
            value="off_sale"
            selected={SaleStatus.sale_status === "off_sale" ? true : false}
          >
            Off Sale
          </option>
        </select>
        </div>
        {PricingForm && (
          <div className="mx-auto inline-block">
            {/*Currency*/}
            <span className="after:content-[''] after:ml-0.5 mt-5 after:text-red-500 block text-left input-label">
              Currency
            </span>
            <select 
              className={SelectClass}
              onChange={(e) =>
                SetCurrency({ ...Currency, currency: e.target.value })
              }
            >
              <option
                // value="reth"
                selected={Currency.currency === "USD" ? "USD" : ""}
              >
                USD
              </option>
            </select>
            {/*Price */}
            <div className="flex flex-col">
              <span className="after:content-[''] after:ml-0.5 mt-5 after:text-red-500 block text-left input-label">
                Price
              </span>
              <input
                type="text"
                value={Price.medallion_price}
                className="mt-1 px-3 login-input p-1 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
                  focus:ring"
                onChange={(e) =>
                  SetPrice({ ...Price, medallion_price: e.target.value })
                }
              />
            </div>
          </div>
        )}
 <div className=" mx-auto inline-block">
        <button className="list-inactive-button px-10 py-2 my-3">
          Update
        </button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default EditSaleStatus;
