import { useState } from "react";
import Web3 from "web3";
import useWalletConnect from "../../Hooks/useWalletConnect";

function HookWallet() {
  const { web3auth, ConnectionError } = useWalletConnect();
  const [web3authProvider, Setweb3authProvider] = useState(null);
  const [CurrentUser, SetCurrentUser] = useState(null);

  //Sign In to Wallet
  const SignInToWallet = async () => {
    if (!web3auth) {
      return console.log("Wallet Not Initiated, please chcek");
    } else {
      try {
        const web3authProvider = await web3auth.connect();
        Setweb3authProvider(web3authProvider);
        return console.log(web3authProvider);
      } catch (error) {
        return console.log("Not Signed In", error);
      }
    }
  };

  //Get Logged User Info
  const GetUserInfo = async () => {
    if (!web3auth) {
      return console.log("Wallet Not Initiated, please check");
    } else {
      if (!web3authProvider) {
        return console.log("Connection Provider Not Established, Please Check");
      } else {
        try {
          const User = await web3auth.getUserInfo();
          SetCurrentUser(User);
          return console.log(User);
        } catch (error) {
          return console.log("Please Sign In");
        }
      }
    }
  };

  //Wallet Logout
  const WalletLogout = async () => {
    if (!web3auth) {
      return console.log("Wallet Not Initiated, please check");
    } else {
      if (!CurrentUser) {
        return console.log("User Not Signed In, Please Login");
      } else {
        try {
          await web3auth.logout();
          return console.log("Logout Successful");
        } catch (error) {
          return console.log("Unable to Logout", error);
        }
      }
    }
  };

  //Get Account Address
  const GetUserAccount = async () => {
    if (!web3auth) {
      return console.log("Wallet Not Initiated, please check");
    } else {
      if (!web3authProvider) {
        return console.log("Connection Provider Not Established, Please Check");
      } else {
        const web3 = new Web3(web3authProvider);
        const accounts = await web3.eth.getAccounts();
      }
    }
  };

  if (ConnectionError) return <h1>Wallet not Initiated, please check </h1>;

  return (
    <div>
      <button className="btn btn-success" onClick={SignInToWallet}>
        Sign In
      </button>
      <button className="btn btn-warning" onClick={GetUserInfo}>
        Get User Info
      </button>
      <button className="btn btn-danger" onClick={WalletLogout}>
        Logout
      </button>
      <button className="btn btn-info" onClick={GetUserAccount}>
        Get User Account
      </button>
      {ConnectionError}
    </div>
  );
}

export default HookWallet;
