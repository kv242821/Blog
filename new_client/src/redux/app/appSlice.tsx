import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAppState {
  isAuthenticated: boolean;
  userInfo?: IUserInfo;
}

export interface IUserInfo {
  avatar: string;
  bio: string;
  email: string;
  name: string;
  _id: string;
  list: Array<any>;
}

const initialState: IAppState = {
  isAuthenticated: false,
  userInfo: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserInfo>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = undefined;
    },
  },
});

export const { login, logout } = appSlice.actions;

export default appSlice.reducer;
