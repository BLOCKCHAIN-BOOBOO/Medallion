import { useSelector } from "react-redux";
import GetFunction from "./../common/GetFunction";
import { BASE_URL } from "./../../api";
import HandleError from "../common/HandleError";
import MenuItem from "./MenuItem";
import { useState } from "react";
import { ValidateToken } from "../../Utils/Helper";

function MenuBar(props) {
  const token = useSelector((state) => state.user.token);
  const [MenuItemsInactive, SetMenuItemsInactive] = useState(false);
  const ChangeToInactive = () => {
    SetMenuItemsInactive(false);
  };

  const ApplyFilter = async (e) => {
    const filter_value = e.target.value;
    const FilterDataUrl =
      BASE_URL +
      (token && ValidateToken()
        ? `/nfts/marketplace?status=${filter_value}`
        : `/nfts/get_nfts?status=${filter_value}`);
    const { result, RequestResolved } = await GetFunction(FilterDataUrl, token);
    const { ResultType, Message } = HandleError(result);
    if (RequestResolved) {
      if (ResultType === "success") {
        const records = result.data.data.records;
        props.LoadFilteredData(records);
      } else {
        console.log(Message);
      }
    }
  };

  return (
    <ul className="flex flex-row md:flex md:flex-row xl:flex xl:flex-row space-x-2 md:mt-4 lg:mt-4 lg:space-x-12 xl:space-x-30 grid grid-cols-3 gap-4 sm:grid sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 sm:gap-5 py-1 md:py-0 xl:py-0 mr-4 sm:mr-0 xl:mr-0">
      {/* <MenuItem
        menu_name="ALL"
        menu_value=""
        ApplyFilter={ApplyFilter}
        ChangeToInactive={ChangeToInactive}
        isActive={MenuItemsInactive}
      /> */}
     
     
      {/* <MenuItem
        menu_name="FIXED SALE"
        menu_value="on_sale"
        ChangeToInactive={ChangeToInactive}
        isActive={MenuItemsInactive}
        ApplyFilter={ApplyFilter}
      />
      <MenuItem
        menu_name="TIMED AUCTION"
        menu_value="timed_auction"
        ChangeToInactive={ChangeToInactive}
        isActive={MenuItemsInactive}
        ApplyFilter={ApplyFilter}
      /> */}


      {/* <li
        onClick={() => {
          SetisActive(true);
        }}
        className={`list-style-none text-white sub_menu_default_border hover:border-b-2 hover:border-b-yellow-600 text-sm md:text-md lg:text-md mr-4 md:my-0 my-5 ${
          isActive ? "sub_menu_default_border_active" : ""
        }`}
      >
        <button
          value="on_sale"
          onClick={ApplyFilter}
          className="hover:font-extrabold font-bold"
        >
          FIXED SALE
        </button>
      </li>
      <li
        onClick={() => {
          SetisActive(true);
        }}
        className={`list-style-none text-white sub_menu_default_border hover:border-b-2 hover:border-b-yellow-600 text-sm md:text-md lg:text-md mr-4 md:my-0 my-5 ${
          isActive ? "sub_menu_default_border_active" : ""
        }`}
      >
        <button
          value="timed_auction"
          onClick={ApplyFilter}
          className="hover:font-extrabold font-bold"
        >
          TIMED AUCTION
        </button>
      </li> */}
    </ul>
  );
}

export default MenuBar;
