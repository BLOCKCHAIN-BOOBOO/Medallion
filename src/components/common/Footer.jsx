import { Link } from "react-router-dom";
import Logo from "./../../theme/images/princess_logo.png";
import Facebook from "./../../theme/images/facebook.png";
import Instagram from "./../../theme/images/instagram.png";
import Twitter from "./../../theme/images/twitter.png";
import Linkedin from "./../../theme/images/linkedin.png";

function Footer() {
  return (
    <footer id="footer">
      <section className="relative footer-section">
        <div className="container mx-auto flex flex-col justify-between xl:flex xl:flex-col xl:justify-between py-1 relative">
          <div className="container mx-auto flex flex-col md:flex md:flex-col xl:flex xl:flex-col justify-between lg:flex lg:flex-col align">
            <Link to="#" className="self-center">
              <span className="font-serif text-3xl text-white  float-left mx-2 md:mx-0">
                <img src={Logo} alt="Princess" className="mx-auto"></img>
              </span>
            </Link>
            <ul className="flex flex-row md:flex md:flex-row xl:flex xl:flex-row space-x-2 md:mt-4 lg:mt-4 lg:space-x-12 self-center xl:space-x-30 grid grid-cols-3 gap-4 sm:grid sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 sm:gap-5 py-1 md:py-0 xl:py-0 mr-4 sm:mr-0 xl:mr-0">
              {/* <li className="list-style-none text-white text-sm mx-4 md:my-0 my-5 ">
              <Link to="/market-place">MARKET PLACE</Link>
            </li> */}
            </ul>
            <div className="flex md:flex-row space-x-3 self-center">
              <Link to="#" className="">
                <img src={Facebook} alt="Facebook"></img>
              </Link>
              <Link to="#" className="">
                <img src={Instagram} alt="Instagram"></img>
              </Link>
              <Link to="#" className="">
                <img src={Twitter} alt="Twitter"></img>
              </Link>
              <Link to="#" className="">
                <img src={Linkedin} alt="Linkedin"></img>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
