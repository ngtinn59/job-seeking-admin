import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthRes } from "../../interfaces";

interface IAuthState {
  account: IAuthRes;
}

const initialState: IAuthState = {
  account: {
    success: false,
    message: "",
    name: "",
    access_token: "",
    email_verified: false,
    token_type: "",
    status_code: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IAuthRes>) => {
      state.account = action.payload;
    },
    loginFailed: (state) => {
      state.account = initialState.account;
    },
    logout: (state) => {
      state.account = initialState.account;
    },
  },
});

export const { loginSuccess, loginFailed, logout } = userSlice.actions;

export default userSlice.reducer;
