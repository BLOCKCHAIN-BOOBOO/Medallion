import { NavLink, Outlet } from "react-router-dom";

function FiltersNavbar() {
  const LoadAllMedallions = () => {
    console.log("Load All Medallions");
  };

  const LoadFixedMedallions = () => {
    console.log("Load Fixed Medallions");
  };
  return (
    <div>
      <ul className="flex flex-row md:flex md:flex-row xl:flex xl:flex-row space-x-2 md:mt-4 lg:mt-4 lg:space-x-12 xl:space-x-30 gap-4 sm:grid sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 sm:gap-5 py-1 md:py-0 xl:py-0 mr-4 sm:mr-0 xl:mr-0">
        <NavLink to="all" onClick={LoadAllMedallions}>
          All Medallions
        </NavLink>
        <NavLink to="fixed-sale" onClick={LoadFixedMedallions}>
          Fixed Sale Medallions
        </NavLink>
        <NavLink to="timed-auction">Timed Auction Medallions</NavLink>
      </ul>
      <Outlet />
    </div>
  );
}

export default FiltersNavbar;
