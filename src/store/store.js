import { configureStore } from "@reduxjs/toolkit";

import appSlice from "./appSlice";
import userSlice from "./userSlice";
import friendSlice from "./friendSlice";

const store = configureStore({
    reducer: {
        appSlice,
        userSlice,
        friendSlice
    }
})


export default store