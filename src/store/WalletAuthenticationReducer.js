import { createSlice } from "@reduxjs/toolkit";

const web3auth_login_token = sessionStorage.getItem("Web3Auth-cachedAdapter");
const openlogin_localstrorage = sessionStorage.getItem("openlogin_store");
const openlogin_localstrorage_object = JSON.parse(openlogin_localstrorage);
let WalletAuthInitialState = null;

//Login State
if (web3auth_login_token) {
  WalletAuthInitialState = {
    IsLoggedIn: true,
    data: openlogin_localstrorage_object,
    user_account: null,
    user_balance: null,
  };
} else {
  WalletAuthInitialState = {
    IsLoggedIn: false,
    data: null,
    user_account: null,
    user_balance: null,
  };
}

const WalletAuthSlice = createSlice({
  name: "WalletAuthentication",
  initialState: WalletAuthInitialState,
  reducers: {
    WalletLoggedIn: (state, action) => {
      state.IsLoggedIn = true;
      state.data = action.payload.data;
      state.user_account = action.payload.user_account;
      state.user_balance = action.payload.user_balance;
    },
    WalletLoggedOut: (state) => {
      state.IsLoggedIn = false;
      state.data = null;
      state.user_account = null;
      state.user_balance = null;
    },
    default: (state) => state,
  },
});

export const { WalletLoggedIn, WalletLoggedOut } = WalletAuthSlice.actions;
const WalletAuthenticationReducer = WalletAuthSlice.reducer;
export default WalletAuthenticationReducer;
