import { createSlice } from "@reduxjs/toolkit";

const metamask_wallet_account = sessionStorage.getItem("metamask_store");
let WalletAuthInitialState = null;
if (metamask_wallet_account) {
  WalletAuthInitialState = {
    IsLoggedIn: true,
    user_account: metamask_wallet_account,
    chainId: null,
  };
} else {
  WalletAuthInitialState = {
    IsLoggedIn: false,
    user_account: null,
    chainId: null,
  };
}

const MetamaskSlice = createSlice({
  name: "MetamaskReducer",
  initialState: WalletAuthInitialState,
  reducers: {
    MetamaskConnected: (state, action) => {
      state.IsLoggedIn = true;
      state.user_account = action.payload.user_account;
      state.chainId = action.payload.chainId;
    },
    MetamaskDisconnected: (state) => {
      state.IsLoggedIn = false;
      state.user_account = null;
      state.chainId = null;
    },
    default: (state) => state,
  },
});

export const { MetamaskConnected, MetamaskDisconnected } =
  MetamaskSlice.actions;
const MetamaskReducer = MetamaskSlice.reducer;
export default MetamaskReducer;
