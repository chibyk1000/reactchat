import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  currentFriend: ""
};

export const friendSlice = createSlice({
  name: "friendSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    setCurrentFriend: (state, action) => {
      state.currentFriend = action.payload;
    }
  },
});

export const { setUser,setCurrentFriend } = friendSlice.actions;

export default friendSlice.reducer;
