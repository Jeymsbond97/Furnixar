import { createSelector } from "reselect";
import { AppRootState } from "../../libs/types/screen";


const selectHomePage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
    selectHomePage, (OrderPage) => OrderPage.pausedOrders
);

export const retrieveProcessOrders = createSelector(
    selectHomePage, (OrderPage) => OrderPage.processOrders
);

export const retrieveFinishedOrders = createSelector(
    selectHomePage, (OrderPage) => OrderPage.finishedOrders
);