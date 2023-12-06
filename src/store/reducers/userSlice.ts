import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserModel } from "@models/user.model";

interface UserState {
  userInfo: UserModel | null;
}

const initialState: UserState = {
  userInfo: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserModel>) => {
      state.userInfo = action.payload;
    }
  }
});

export const { setUserInfo } = userSlice.actions;
export const selectUserInfo = (state: { user: UserState }) => state.user.userInfo;

export default userSlice.reducer;
