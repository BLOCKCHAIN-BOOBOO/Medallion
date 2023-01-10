import { useSelector } from "react-redux";
import { UserLoggedOut } from "../../store/UserAuthenticationReducer";
import { ValidateToken } from "../../Utils/Helper";
import Logo from "./../../theme/images/Logo.png";
import NewDropDown from "./NewDropDown";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CurrentWallet_DisConnected } from "../../store/CurrentWalletReducer";
import MenuItem from "../MarketPlace/MenuItem";
import { useState,useRef } from "react";
import { NavLink } from "react-router-dom";


function NavBarNew() {
  const [currenttab,setCurrentTab]=useState("Dashboard");
   const [url, setUrl] = useState(null);
   
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var React  = require('react');
  var Scroll = require('react-scroll');  
var scroll    = Scroll.animateScroll;

const wrapperRef = useRef(null);
useOutsideAlerter(wrapperRef);

const showDropdown = () => {
  console.log(isMenuOpen)
  if (isMenuOpen) {
    setIsMenuOpen(false);
    console.log("if")
  }
else if(!isMenuOpen) {
    setIsMenuOpen(true);
    console.log("else if")

  }
  else{
    console.log("else ")
    
  }
//   let lists = document.querySelector('ul');
//  lists.classList.toggle("ul-close");

//  let list = document.querySelector('button');
//  list.classList.toggle("close-icon");

};

function useOutsideAlerter(ref) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}


  const CurrentWallet = useSelector((state) => state.CurrentWallet);
  var dashboardurl = window.location.pathname;
  console.log(dashboardurl);
const SignOut = async () => {
    sessionStorage.setItem("princess_store", "");
    if (CurrentWallet && CurrentWallet.wallet_name) {
      await WalletDisconnect(CurrentWallet.wallet_name);
      dispatch({
        type: UserLoggedOut,
      });
      navigate("/login");
    } else {
      dispatch({
        type: UserLoggedOut,
      });
      navigate("/login");
    }
  };


  // const scrollTo =()=> {
  //   scroll.scrollToBottom();
  //   const section = document.querySelector( '#componentToScrollTo' );
  //  section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  // };
//   const scrollTo =()=> {
//     const section = document.querySelector( '#componentToScrollTo' );
//     section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  
// };
  const WalletDisconnect = async (wallet_name) => {
    if (wallet_name === "MetaMask") {
      try {
        sessionStorage.removeItem("current_wallet");
        dispatch({
          type: CurrentWallet_DisConnected,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (wallet_name === "WalletConnect") {
      console.log("WalletConnect Disconnect");
      try {
        sessionStorage.removeItem("walletconnect");
        sessionStorage.removeItem("current_wallet");
        dispatch({
          type: CurrentWallet_DisConnected,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return true;
    }
  };

  const mobileMenutoggle=(e)=>{
    // let listsss = document.querySelector('button');
   
//  let lists = document.querySelector('ul');
//  lists.classList.toggle("ul-close");

//  let list = document.querySelector('button');
//  list.classList.toggle("close-icon");



//     const styles= e.target.name === 'menu' ? (e.target.name = "close", list.classList.remove('top-[55px]'),list.classList.add('hidden') ,list.classList.remove('opacity-100'),list.classList.add('opacity-0')) : 
//         (e.target.name = "menu",  list.classList.add('top-[55px]'),list.classList.remove('hidden'), list.classList.add('opacity-100') ,list.classList.remove('opacity-0'),listsss.classList.add("close-icon"),listsss.classList.remove("close-icon"))

      }
      

  // const hideicon=(e)=>{
  //   let list = document.querySelector('button');
  //   list.classList.toggle("close-icon");
   
   
  //     }



  return (
    <div>
    <nav className="fixed align w-full z-10 top-0 princess-background sm:h-full h-16 md:h-20 xl:h-20">
    {/* shadow */}
      <div className="container mx-auto relative md:flex md:items-center md:justify-between py-2 md:py-4">
        <Link to={user.token && ValidateToken()?"/collection":"/market-place"}>
          <span className="flex font-serif text-3xl text-white float-left mx-2 md:mx-0">
            <img src={Logo} alt="Princess" className="mx-2"></img>
            <span className="princess-header-text xl:block lg:block md:hidden sm:hidden hidden">PRINCESS</span>
          </span>
        </Link>

        <div className="block relative cursor-pointer md:hidden">
        {isMenuOpen&&( 
        <button className="flex flex-col text-xl float-right right-8 top-6 mx-2 md:mx-0 fa fa-close"
          //  onClick={e=>mobileMenutoggle(e)}
          onClick={showDropdown}>

          </button>
)}{ !isMenuOpen&&( 
   <button className="flex flex-col float-right right-8 top-6 mx-2 md:mx-0 bar-icon"
          //  onClick={e=>mobileMenutoggle(e)}
          onClick={showDropdown}
           
           >
            {/* <ion-icon name="menu" onClick={e=>mobileMenutoggle(e)}></ion-icon> */}
         
             {/* <i class="fa fa-bars"></i>
             <i class="fa fa-close"></i> */}

          </button>)}

         
        </div>


<div className="show-desktop-menu">
<ul
          className="w-full md:w-auto md:flex-row xl:flex-row sm:flex-row flex-col  md:items-center  bg-white sm:bg-white 
          md:bg-transparent lg:bg-transparent 
          absolute z-[1] md:static md:z-auto
          mt-10 md:mt-0 lg:mt-0 left-0 py-2 md:opacity-100 opacity-100 transition-all ease-in duration-500 hidden sm:hidden md:flex xl:flex"
           >             
          <li 
          
            // onClick={e=>mobileMenutoggle(e)}
          //  onClick="Menu(this)"
           className="navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg md:mx-2 xl:mx-4 sm:mx-2 mx-2 md:my-2 my-2 "
           
           >
            <NavLink  
             to="/market-place">MARKETPLACE</NavLink>    
             
          </li>        


          <li 
          // onClick="Menu(this)"
          //  onClick={e=>mobileMenutoggle(e)}
        
           className="navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg list-style-none md:mx-2 xl:mx-4 sm:mx-2 mx-2 md:my-2 my-2"
          >
            <NavLink   to="/collection">MY COLLECTIONS</NavLink>
          </li>

          <li 
          // onClick={e=>(mobileMenutoggle(e),hideicon())} 
          // onClick={e=>mobileMenutoggle(e)}
        
           className={`navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg list-style-none md:mx-2 xl:mx-4 sm:mx-2 mx-2 py-2 my-2" 
            ${dashboardurl === "/user-dashboard/update-user-password" &&" active"} ${dashboardurl==="/user-dashboard/wallet" &&" active"} ${dashboardurl==="/user-dashboard" &&" active"} {dashboardurl==="/user-dashboard/update-user-password" &&" active"}`}>
            <NavLink to="/user-dashboard/update-profile">
            DASHBOARD </NavLink>
            {/* <Link
    activeClass="active"
    to="componentToScrollTo"
    spy={true}
    smooth={true}
    onClick={scrollToTop}
    offset={-70}
    duration={500}
> DASHBOARD</Link> */}
          </li>
          {/* to="/user-dashboard/update-dashboard" */}
          {user.token && ValidateToken() && (
            <li 
            // onClick={e=>mobileMenutoggle(e)}
           
            // onClick="Menu(this)"
            className="navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg list-style-none md:mx-2 xl:mx-4 sm:mx-2 mx-2 md:my-2 my-2">
              <NavLink to="/activity">ACTIVITY</NavLink>
              
            </li>
          )}
         {user.token && ValidateToken() ? <div className="text-1xl mb-3 md:mb-0 float-right md:hidden " ><NavLink
            to="/login"
            onClick={SignOut}
            className="navbar-option-text text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 flex float-right justify-end "
          >
            Log Out
          </NavLink></div>:<div className="text-1xl mb-3 md:mb-0 float-right text-right self-end justify-end md:hidden">
            <Link 
               onClick={e=>mobileMenutoggle(e)}
              to="/login"
              className="navbar-option-text hover:border-b-yellow-600 text-sm  duration-500 mx-5"
            >
              LOG IN
            </Link>
            <Link 
               onClick={e=>mobileMenutoggle(e)}
              to="/create-user-account"
              // btn-sign
              className="text-white rounded-3xl duration-500 signup-btn mr-4 md:mr-0 px-3 py-2"
            >
              SIGN UP
            </Link>
          </div>
}
        </ul>
</div>



        {isMenuOpen  && ( 
           <ul
          className="w-full md:w-auto md:flex-row xl:flex-row sm:flex-row flex-col  md:items-center  bg-white sm:bg-white 
          md:bg-transparent lg:bg-transparent 
          absolute z-[1] md:static md:z-auto
          mt-10 md:mt-0 lg:mt-0 left-0 py-2 md:opacity-100 opacity-100 opacity-0 transition-all ease-in duration-500 ul-open"
          ref={wrapperRef}  >             
          <li 
            onClick={ showDropdown}
            // onClick={e=>mobileMenutoggle(e)}
          //  onClick="Menu(this)"
           className="navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg md:mx-2 xl:mx-4 sm:mx-2 mx-2 md:my-2 my-2 "
           
           >
            <NavLink  
             to="/market-place">MARKETPLACE</NavLink>    
             
          </li>        


          <li 
          // onClick="Menu(this)"
          //  onClick={e=>mobileMenutoggle(e)}
          onClick={ showDropdown}
           className="navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg list-style-none md:mx-2 xl:mx-4 sm:mx-2 mx-2 md:my-2 my-2"
          >
            <NavLink   to="/collection">MY COLLECTIONS</NavLink>
          </li>

          <li 
          // onClick={e=>(mobileMenutoggle(e),hideicon())} 
          // onClick={e=>mobileMenutoggle(e)}
          onClick={ showDropdown}
           className={`navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg list-style-none md:mx-2 xl:mx-4 sm:mx-2 mx-2 py-2 my-2" 
            ${dashboardurl === "/user-dashboard/update-user-password" &&" active"} ${dashboardurl==="/user-dashboard/wallet" &&" active"} ${dashboardurl==="/user-dashboard" &&" active"} {dashboardurl==="/user-dashboard/update-user-password" &&" active"}`}>
            <NavLink to="/user-dashboard/update-profile">
            DASHBOARD </NavLink>
            {/* <Link
    activeClass="active"
    to="componentToScrollTo"
    spy={true}
    smooth={true}
    onClick={scrollToTop}
    offset={-70}
    duration={500}
> DASHBOARD</Link> */}
          </li>
          {/* to="/user-dashboard/update-dashboard" */}
          {user.token && ValidateToken() && (
            <li 
            // onClick={e=>mobileMenutoggle(e)}
            onClick={ showDropdown}
            // onClick="Menu(this)"
            className="navbar-option-text text-xs sm:text-sm md:text-md xl:text-lg list-style-none md:mx-2 xl:mx-4 sm:mx-2 mx-2 md:my-2 my-2">
              <NavLink to="/activity">ACTIVITY</NavLink>
              
            </li>
          )}
         {user.token && ValidateToken() ? <div className="text-1xl mb-3 md:mb-0 float-right md:hidden " ><NavLink
            to="/login"
            onClick={e=>(mobileMenutoggle(e),SignOut())}
            className="navbar-option-text text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 flex float-right justify-end "
          >
            Log Out
          </NavLink></div>:<div className="text-1xl mb-3 md:mb-0 float-right text-right self-end justify-end md:hidden">
            <Link 
              //  onClick={e=>mobileMenutoggle(e)}
              onClick={ showDropdown}
              to="/login"
              className="navbar-option-text hover:border-b-yellow-600 text-sm  duration-500 mx-5"
            >
              LOG IN
            </Link>
            <Link 
              //  onClick={e=>mobileMenutoggle(e)}
              onClick={ showDropdown}
              to="/create-user-account"
              // btn-sign
              className="text-white rounded-3xl duration-500 signup-btn mr-4 md:mr-0 px-3 py-2"
            >
              SIGN UP
            </Link>
          </div>
}
        </ul>)}
        <div className="text-1xl mb-0 md:mb-0 invisible md:visible">
          {user.token && ValidateToken() ? (
            <NewDropDown user={user} />
          ) : (
            <div>
              <Link
                to="/login  "
                className="navbar-option-text hover:border-b-yellow-600  text-sm  mx-5"
              >
                LOG IN
              </Link>
              <Link
                to="/create-user-account"
                // btn-sign
                className="text-white rounded-3xl  signup-btn mr-4 md:mr-0 px-3 py-2"
              >
                SIGN UP
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>


  );
}

export default NavBarNew;
