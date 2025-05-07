import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../libs/types/screen";



const initialState: ProductPageState = {
    choosenProduct: null,
    products: [],
};

const productsPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        setChoosenProduct: (state, action) => {
            state.choosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    }
});

export const { setChoosenProduct, setProducts} = productsPageSlice.actions;
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;