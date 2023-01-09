import { NavLink } from "react-router-dom";

function DashboardMenu() {
  return (
    <div>
    <ul className="lg:flex-row mt-2 xl:flex-row flex md:flex-row sm:flex-row flex-col p-3 justify-start">
     
     <li className="px-4">
       <NavLink
        to="wallet"
        className="dashboard-tabs-text "
      >
        WALLET
      </NavLink>
      </li>
      <li className="px-4">
      <NavLink
         to="update-profile"
        className="dashboard-tabs-text "
      >
        EDIT PROFILE
      </NavLink>
      </li>
      <li className="px-4">
      <NavLink
        to="update-user-password"
        className="dashboard-tabs-text"
      >
        CHANGE PASSWORD
      </NavLink>
      </li>
    </ul>
    </div>
  );
}

export default DashboardMenu;
