/**   REACT APP STATE   **/

import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

export  interface AppRootState {
    homePage: HomePageState;
    productPage: ProductPageState;
    ordersPage: OrdersPageState;
}

/** HOMEPAGE **/
export interface HomePageState{
    topProducts: Product[];
    newProducts: Product[];
    topUsers: Member[];
}

/*  PRODUCTS PAGE  */
export interface ProductPageState{
    restaurant: Member | null;
    choosenProduct: Product | null;
    products: Product[];
}

/*   ORDERS  */

export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}