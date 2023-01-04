import { createSlice } from "@reduxjs/toolkit";

let ModalInitialState = { is_open: false };

const ModalSlice = createSlice({
  name: "ModalReducer",
  initialState: ModalInitialState,
  reducers: {
    Modal_Opened: (state, action) => {
      state.is_open = true;
    },
    Modal_Closed: (state) => {
      state.is_open = false;
    },
    default: (state) => state,
  },
});

export const { Modal_Opened, Modal_Closed } = ModalSlice.actions;
const ModalReducer = ModalSlice.reducer;
export default ModalReducer;
