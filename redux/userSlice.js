import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload.uid
    },

    signOutUser: (state) => {
      (state.username = null), (state.name = null), (state.email = null);
    },
  },
});

export const { setUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
