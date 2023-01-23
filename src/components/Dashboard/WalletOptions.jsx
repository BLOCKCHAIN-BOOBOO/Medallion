import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConnectionInit,
  SignInToWallet,
  GetUserAccount,
} from "../Wallets/WalletConnect";
import { WalletLoggedIn } from "../../store/WalletAuthenticationReducer";

import Modal from "../common/Modal";

const WalletOptions = () => {
  const [OpenModal, SetOpenModal] = useState(false);
  const WalletStore = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const HandleApplicationState = async (
    web3auth,
    web3authProvider,
    UserAccount
  ) => {
    const WalletSignInType = sessionStorage.getItem("Web3Auth-cachedAdapter");
    if (WalletSignInType) {
      //Getting the wallet object from Local Storage
      const wallet_data_string = sessionStorage.getItem("openlogin_store");
      const wallet_data_object = await JSON.parse(wallet_data_string);
      dispatch({
        type: WalletLoggedIn,
        payload: {
          IsLoggedIn: true,
          data: wallet_data_object,
          web3auth: web3auth,
          web3authprovider: web3authProvider,
          user_account: UserAccount,
        },
      });
    }
  };

  const HandleWalletConfig = async (chain_type) => {
    SetOpenModal(false);
    try {
      const web3auth = await ConnectionInit(chain_type);
      if (web3auth) {
        const web3authProvider = await SignInToWallet(web3auth);
        if (web3authProvider) {
          const UserAccount = await GetUserAccount(web3authProvider);
          await HandleApplicationState(web3auth, web3authProvider, UserAccount);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ShowWallets = () => {
    const account = await MetaMaskUserAccount();
      const connected_chainid = await ConnectedChainId();
      if (account) {
        current_wallet.user_account = account;
        current_wallet.chainId = connected_chainid;
        current_wallet.wallet_name = "MetaMask";
        UpdateState(current_wallet);
      }
  };

  return (
    <div className="my-3">
      {!WalletStore.IsLoggedIn && (
        <div>
          <button className="p-2 bg-yellow-400" onClick={ShowWallets}>
            Wallet Connect
          </button>
          {/* <Modal ModalOpen={OpenModal} ModalClose={() => SetOpenModal(false)}> */}
            {/* Modal Body */}
            <div className="flex flex-col text-center">
              <div className="my-2">
                <button
                  className="btn-sign p-2"
                  onClick={() => HandleWalletConfig("reth")}
                >
                  Connect to Ethereum Chain
                </button>
              </div>
              <div className="my-2">
                <button
                  className="btn-sign p-2"
                  onClick={() => HandleWalletConfig("matic")}
                >
                  Connect to Polygon Chain
                </button>
              </div>
            </div>
          {/* </Modal> */}
        </div>
      )}
    </div>
  );
};

export default WalletOptions;
