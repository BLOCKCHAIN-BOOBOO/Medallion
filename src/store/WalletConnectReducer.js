import { createSlice } from "@reduxjs/toolkit";

const WalletConnectLocalString = sessionStorage.getItem("walletconnect");
const WalletConnectLocalObject = JSON.parse(WalletConnectLocalString);

let WalletConnectInitialState = null;
if (WalletConnectLocalString) {
  WalletConnectInitialState = {
    IsLoggedIn: WalletConnectLocalObject.connected,
    user_account: WalletConnectLocalObject.accounts[0],
    chainId: WalletConnectLocalObject.chainId,
  };
} else {
  WalletConnectInitialState = {
    IsLoggedIn: false,
    user_account: null,
    chainId: null,
  };
}

const WalletConnectSlice = createSlice({
  name: "WalletConnectReducer",
  initialState: WalletConnectInitialState,
  reducers: {
    WalletConnectDisconnected: (state) => {
      state.IsLoggedIn = false;
      state.user_account = null;
      state.chainId = null;
    },
    default: (state) => state,
  },
});

export const { WalletConnectDisconnected } = WalletConnectSlice.actions;
const WalletConnectReducer = WalletConnectSlice.reducer;
export default WalletConnectReducer;
