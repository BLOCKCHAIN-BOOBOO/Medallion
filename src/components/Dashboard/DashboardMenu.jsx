import { NavLink } from "react-router-dom";

function DashboardMenu() {
  return (
    <div className="lg:flex-row mt-2 md:flex-row flex border rounded-xl p-3 justify-start space-x-10">
      <NavLink
        to="wallet"
        className="active:border-b-2 active:border-b-yellow-600 hover:border-b-2 hover:border-b-yellow-600 text-sm  font-bold text-white border-2 border-transparent"
      >
        WALLET
      </NavLink>
      <NavLink
         to="update-profile"
        className="active:border-b-2 active:border-b-yellow-600 hover:border-b-2
         hover:border-b-yellow-600 text-sm  font-bold text-white border-2 border-transparent "
      >
        EDIT PROFILE
      </NavLink>
      <NavLink
        to="update-user-password"
        className="active:border-b-2 active:border-b-yellow-600 hover:border-b-2 hover:border-b-yellow-600 text-sm  font-bold text-white border-2 border-transparent"
      >
        CHANGE PASSWORD
      </NavLink>
    </div>
  );
}

export default DashboardMenu;
