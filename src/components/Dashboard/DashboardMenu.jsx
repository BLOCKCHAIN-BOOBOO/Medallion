import { NavLink } from "react-router-dom";

function DashboardMenu() {
  return (
    <div>
    <ul className="lg:flex-row mt-2 md:flex-row flex  p-3 justify-start space-x-10">
     
     <li>
       <NavLink
        to="wallet"
        className="dashboard-tabs-text "
      >
        WALLET
      </NavLink>
      </li>
      <li>
      <NavLink
         to="update-profile"
        className="dashboard-tabs-text "
      >
        EDIT PROFILE
      </NavLink>
      </li>
      <li>
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
