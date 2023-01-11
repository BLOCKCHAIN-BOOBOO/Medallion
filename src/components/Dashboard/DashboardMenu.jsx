import { NavLink } from "react-router-dom";

function DashboardMenu() {
  return (
    <div>
    <ul className="lg:flex-row mt-2 xl:flex-row flex md:flex-row sm:flex-row flex-col p-3 justify-start">
     
     <li className="xl:px-4 md:px-2 sm:px-1 px-1">
       <NavLink
        to="wallet"
        className="dashboard-tabs-text "
      >
        WALLET
      </NavLink>
      </li>
      <li className="xl:px-4 md:px-2 sm:px-1 px-1 ">
      <NavLink
         to="update-profile"
        className="dashboard-tabs-text "
      >
        EDIT PROFILE
      </NavLink>
      </li>
      <li className="xl:px-4 md:px-2 sm:px-1 px-1">
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
