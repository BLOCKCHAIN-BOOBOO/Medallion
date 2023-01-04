import { useRef } from "react";
import { useState } from "react";

function MenuItem(props) {
  const li_element = useRef(null);
  const [isActive, SetisActive] = useState(props.isActive);
  const MakeMenuItemActive = () => {
    SetisActive(true);
    props.ChangeToInactive();
  };
  return (
    <li
      ref={li_element}
      className={`list-style-none text-white sub_menu_default_border hover:border-b-2 hover:border-b-yellow-600 text-sm md:text-md lg:text-md mr-4 md:my-0 my-5 ${
        isActive ? "sub_menu_default_border_active" : ""
      }`}
      onClick={MakeMenuItemActive}
    >
      <button
        value={props.menu_value}
        onClick={props.ApplyFilter}
        className="hover:font-extrabold font-bold"
      >
        {props.menu_name}
      </button>
    </li>
  );
}

export default MenuItem;
