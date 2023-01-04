import { useRef ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserLoggedOut } from "../../store/UserAuthenticationReducer";
import { FormatUsername } from "../../Utils/Helper";
// import { WalletLoggedOut } from "../../store/WalletAuthenticationReducer";
import { useSelector } from "react-redux";
// import { WalletLogout } from "../Wallets/web3auth";
import { CurrentWallet_DisConnected } from "../../store/CurrentWalletReducer";

function NewDropDown(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CurrentWallet = useSelector((state) => state.CurrentWallet);

  const dropdown_node = useRef(null);
  const toggleClass = () => {
    dropdown_node.current.classList.toggle("hidden");
  };



const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  
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
 function useOutsideAlerter(ref) {
  // useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
       
         dropdown_node.current.classList.add("hidden");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // }, [ref]);
}
  return (
    <div className="flex flex-col relative ml-4" ref={wrapperRef} >
      <button
        id="dropdownNavbarLink"
        // ref={wrapperRef}
        type="button"
        onClick={toggleClass}
        data-dropdown-toggle="dropdownNavbar"
        className="navbar-option-text hover:bg-white-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2  md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
      >
        {props.user.token && FormatUsername(props.user)} &nbsp;
        <ion-icon name="caret-down-outline"></ion-icon>
      </button>
      <div
        id="dropdownNavbar"
        ref={dropdown_node}
        className="absolute hidden mt-10 -ml-6 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-36"
      >
        <ul className="py-1" aria-labelledby="dropdownLargeButton">
          <li>
            <Link
              to="/collection" onClick={toggleClass}
              className="text-sm navbar-option-text block px-4 py-2"
            >
              My Collections
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/update-profile" onClick={toggleClass}
              className="text-sm navbar-option-text block px-4 py-2"
            >
               {/* to="/user-dashboard/update-profile" */}
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="py-1">
          <Link
            to="/login"
            onClick={SignOut}
            className="text-sm navbar-option-text block px-4 py-2"
          >
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewDropDown;
