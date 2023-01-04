import { createSlice } from "@reduxjs/toolkit";

const CurrentWalletLocalString = sessionStorage.getItem("current_wallet");
const CurrentWalletLocalObject = JSON.parse(CurrentWalletLocalString);
let WalletConnectionStatus = false;
if (CurrentWalletLocalString) {
  const CurrentWalletName = CurrentWalletLocalObject.wallet_name;
  if (CurrentWalletName && CurrentWalletName === "WalletConnect") {
    const WalletConnectLocalString = sessionStorage.getItem("walletconnect");
    const WalletConnectLocalObject = JSON.parse(WalletConnectLocalString);
    WalletConnectionStatus = WalletConnectLocalObject.connected;
  } else if (CurrentWalletName && CurrentWalletName === "MetaMask") {
    if (window.ethereum) {
      WalletConnectionStatus = true;
    } else {
      WalletConnectionStatus = false;
    }
  }
}

let CurrentWalletInitialState = null;
if (CurrentWalletLocalObject) {
  CurrentWalletInitialState = {
    IsLoggedIn: WalletConnectionStatus,
    user_account: CurrentWalletLocalObject.user_account,
    chainId: CurrentWalletLocalObject.chainId,
    wallet_name: CurrentWalletLocalObject.wallet_name,
  };
} else {
  CurrentWalletInitialState = {
    IsLoggedIn: false,
    user_account: null,
    chainId: null,
    wallet_name: null,
  };
}

const CurrentWalletSlice = createSlice({
  name: "CurrentWalletReducer",
  initialState: CurrentWalletInitialState,
  reducers: {
    CurrentWallet_Connected: (state, action) => {
      state.IsLoggedIn = true;
      state.user_account = action.payload.user_account;
      state.chainId = action.payload.chainId;
      state.wallet_name = action.payload.wallet_name;
    },
    CurrentWallet_DisConnected: (state) => {
      state.IsLoggedIn = false;
      state.user_account = null;
      state.chainId = null;
      state.wallet_name = null;
    },
    default: (state) => state,
  },
});

export const { CurrentWallet_Connected, CurrentWallet_DisConnected } =
  CurrentWalletSlice.actions;
const CurrentWalletReducer = CurrentWalletSlice.reducer;
export default CurrentWalletReducer;
