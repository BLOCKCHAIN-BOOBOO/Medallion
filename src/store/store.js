import { configureStore } from "@reduxjs/toolkit";
import CurrentWalletReducer from "./CurrentWalletReducer";
import MetamaskReducer from "./MetamaskReducer";
import ModalReducer from "./ModalReducer";
import UserAuthenticationReducer from "./UserAuthenticationReducer";
import WalletAuthenticationReducer from "./WalletAuthenticationReducer";
import WalletConnectReducer from "./WalletConnectReducer";

let store = configureStore({
  reducer: {
    user: UserAuthenticationReducer,
    wallet: WalletAuthenticationReducer,
    metamask: MetamaskReducer,
    WalletConnect: WalletConnectReducer,
    CurrentWallet: CurrentWalletReducer,
    Modal: ModalReducer,
  },
  devTools: true,
});

export default store;
