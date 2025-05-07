import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import HomePageReducer from './pages/slice';
import ProductsPageReducer from './pages/shop/slice';


export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        // @ts-expect-error logger type mismatch
        getDefaultMiddleware().concat(reduxLogger),
    reducer: {
        homePage: HomePageReducer,
        productPage: ProductsPageReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
