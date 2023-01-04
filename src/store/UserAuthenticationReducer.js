import { createSlice } from "@reduxjs/toolkit";

const GetLocalStorageToken = sessionStorage.getItem("princess_store");
let UserAuthInitialState = GetLocalStorageToken
  ? JSON.parse(GetLocalStorageToken)
  : { token: null, email: null, first_name: null, last_name: null };

const UserAuthenticationSlice = createSlice({
  name: "UserAuthentication",
  initialState: UserAuthInitialState,
  reducers: {
    UserLoggedIn: (state, action) => {
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.token = action.payload.token;
    },
    UserLoggedOut: (state) => {
      state.email = null;
      state.first_name = null;
      state.last_name = null;
      state.token = null;
    },
    default: (state) => state,
  },
});

export const { UserLoggedIn, UserLoggedOut } = UserAuthenticationSlice.actions;
const UserAuthenticationReducer = UserAuthenticationSlice.reducer;
export default UserAuthenticationReducer;
