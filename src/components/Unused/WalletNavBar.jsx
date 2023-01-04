import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignIn from "../components/Wallet/SignIn";
import SignOut from "../components/Wallet/SignOut";

function NavBarNew() {
  const WebAuthUser = useSelector((state) => state.wallet);

  return (
    <nav className="navbar navbar-expand-lg nav_background text-white sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex" to="/">
          <img
            src={window.location.origin + "/images/princess_logo.svg"}
            alt="Logo"
          ></img>
        </Link>

        <div>
          {WebAuthUser.name ? (
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-white"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    to="#"
                  >
                    {WebAuthUser.name}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/user-dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <SignOut />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBarNew;
