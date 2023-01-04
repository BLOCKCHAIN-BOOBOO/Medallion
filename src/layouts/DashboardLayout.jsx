import { Outlet } from "react-router";
import ProfileCard from "./../components/Dashboard/ProfileCard";
import DashboardMenu from "./../components/Dashboard/DashboardMenu";
import TitleBanner from "../components/common/TitleBanner";
import { useEffect } from "react";

function DashboardLayout() {
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div id="content_wrap">
      <section className="marketplace-section py-10 mt-16 sm:mt-16 md:mt-20 lg:mt-20 md:pt-10 md:pb-4 lg:pt-10 lg:pb-4 relative">
        <div className="container mx-auto flex flex-col md:flex md:flex-col lg:flex lg:flex-col align">
          <TitleBanner title="DASHBOARD" />
        </div>
      </section>
      <div className="market-section-color">
        <div className="container mx-auto flex flex-col">
          <ProfileCard />
          <DashboardMenu />
        </div>
        <section className="market-background relative pt-10">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardLayout;