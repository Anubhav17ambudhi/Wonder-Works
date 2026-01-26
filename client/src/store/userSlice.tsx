import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdetails: {} , 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userdetails = action.payload;
    },

    clearUser: (state) => {
      state.userdetails = null;
    },
  },
});

/* actions */
export const { setUser, clearUser } = userSlice.actions;
/* selector = getUser */
// export const getUser = (state) => state.user.user;
/* reducer */
export default userSlice.reducer;
