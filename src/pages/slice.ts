import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../libs/types/screen";


const initialState: HomePageState = {
    topProducts: [],
    newProducts: [],
    topUsers: [],
}

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers : {
        setTopProducts: (state, action) =>{
            state.topProducts = action.payload;
        },
        setNewProducts: (state, action) =>{
            state.newProducts = action.payload;
        },
        setTopUsers: (state, action) =>{
            state.topUsers = action.payload;
        }
    }
});

export const { setTopProducts, setNewProducts, setTopUsers} = homePageSlice.actions;
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;