import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collapse: false
}


export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setCollapse: (state, action) => {
            
            console.log(action)
            state.collapse = action.payload
        
        }
    }
})


export const { setCollapse } = appSlice.actions

export default appSlice.reducer