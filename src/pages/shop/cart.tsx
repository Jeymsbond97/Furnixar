import { Link, useNavigate } from "react-router-dom";

import NavbarOne from "../../components/navbar/navbar-one";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";

import bg from '../../assets/img/shortcode/breadcumb.jpg'
import { useEffect, useState } from "react";
import Aos from "aos";
import { CartItem } from "../../libs/types/search";
import { Order, OrderInquiry, OrderUpdateInput } from "../../libs/types/order";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders } from "./orderSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../libs/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobal";
import { retrievePausedOrders } from "./orderSelector";
import { Messages, serverApi } from "../../libs/config";
import { sweetErrorHandling } from "../../libs/sweetAlert";
import { T } from "../../libs/types/common";

const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
});

/**  REDUX SLICE & SELECTOR  **/
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({pausedOrders}),
);
interface CartProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}
export default function Cart(props: CartProps) {
    const { cartItems, onDelete, onRemove, onDeleteAll, onAdd } = props;
    const { orderBuilder, setOrderBuilder, authMember } = useGlobals()
    const navigate = useNavigate()
    const { setPausedOrders, setProcessOrders }
        = actionDispatch(useDispatch());
    const { pausedOrders} = useSelector(pausedOrdersRetriever);
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE
    })
    useEffect(()=>{
        Aos.init()
    })

    useEffect(() => {
        const order = new OrderService();

        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
        .then((data) => setPausedOrders(data))
        .catch((err) => console.log(err));

        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
        .then((data) => setProcessOrders(data))
        .catch((err) => console.log(err));

    }, [orderInquiry, orderBuilder])


    /**   HANDLER   **/

const deleteOrderHandler = async (e: T) => {
    try{
        if(!authMember) throw new Error(Messages.error2);
        const orderId = e.target.value;
        const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.DELETE,
        };

        const confirmation = window.confirm("Do you want to delete the order?");
        if(confirmation){
            const order = new OrderService();
            await order.updateOrder(input);

            // REBUILD
            setOrderBuilder(new Date());

        }
    }
    catch(err){
        console.log(err);
        sweetErrorHandling(err).then();
    }
};

const processOrderHandler = async (e: T) => {
    try{
        if(!authMember) throw new Error(Messages.error2);
        //PAYMENT PROCESS

        const orderId = e.target.value;
        const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.PROCESS,
        };

        const confirmation = window.confirm("Do you want to checkout your order?");
        if(confirmation){
            const order = new OrderService();
            await order.updateOrder(input);

            // FORWARD PROCESS
            setOrderBuilder(new Date());
            navigate('/checkout')

        }
    }
    catch(err){
        console.log(err);
        sweetErrorHandling(err).then();
    }
};

return (
    <>
        <NavbarOne
            cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}/>

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Cart</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Cart</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container ">
                <div className="flex xl:flex-row flex-col gap-[30px] lg:gap-[30px] xl:gap-[70px]">
                    <div className="flex-1 overflow-x-auto" data-aos="fade-up" data-aos-delay="100"  style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <table id="cart-table" className="responsive nowrap table-wrapper" style={{width:'100%'}}>
                            <thead className="table-header">
                                <tr>
                                    <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Product Info</th>
                                    <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Price</th>
                                    <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Quantity</th>
                                    <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Total</th>
                                </tr>
                            </thead>
                            {pausedOrders.length > 0 ? (
                            pausedOrders.map((order: Order) => (
                            <tbody key={order._id} className="table-body" style={{ borderBottom: '5px solid black', padding: '5px', borderRadius: '12px' }}>
                                {order.orderItems.map((item) => {
                                    const product = order.productData.find(p => p._id === item.productId);
                                    const imagePath = `${serverApi}/${product?.productImages[0]}`;

                                    return (
                                    <tr key={item._id}>
                                        <td className="md:w-[42%]">
                                        <div className="flex items-center gap-3 md:gap-4 lg:gap-6 cart-product my-4">
                                            <div className="w-14 sm:w-20 flex-none">
                                            <img className="w-[70px] h-[70px] object-cover" src={imagePath} alt="product" />
                                            </div>
                                            <div className="flex-1">
                                            <h5 className="font-semibold leading-none mt-2">
                                                <Link to="#">{product?.productName}</Link>
                                            </h5>
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                        <h6 className="text-base md:text-lg leading-none text-title dark:text-white font-semibold">
                                            ${item.itemPrice}
                                        </h6>
                                        </td>
                                        <td>
                                        <h5>{item.itemQuantity}</h5>
                                        </td>
                                        <td>
                                        <h6 className="text-base md:text-lg leading-none text-title dark:text-white font-semibold">
                                            ${item.itemPrice * item.itemQuantity}
                                        </h6>
                                        </td>
                                    </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan={5} className="p-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 p-4 border-t border-gray-300">
                                        <div className="flex flex-wrap gap-6 text-base sm:text-lg font-medium text-title dark:text-white">
                                        <span>Price: <span className="font-semibold">${order.orderTotal - order.orderDelivery}</span></span>
                                        <span>Delivery Cost: <span className="font-semibold">${order.orderDelivery}</span></span>
                                        <span>Total Price: <span className="font-semibold">${order.orderTotal}</span></span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                        <button
                                            data-text="Cancel"
                                            value={order._id}
                                            onClick={deleteOrderHandler}
                                            className="btn btn-outline btn-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            value={order._id}
                                            data-text="Checkout"
                                            onClick={processOrderHandler}
                                            className="btn btn-theme-solid btn-sm"
                                        >
                                            Checkout
                                        </button>
                                        </div>
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            ))
                            ) : (
                            <tbody>
                                <tr>
                                <td colSpan={5} className="text-center py-12">
                                    <div className="text-center text-xl mt-8 black bold dark:text-white">
                                    <span  className="text-center text-xl mb-"> 🛒 No products in your cart. <br /></span>
                                        <Link to='/shop-v1'
                                            data-text="Go shopping...."
                                            className="btn btn-outline btn-sm mt-6">
                                            Go shopping....
                                        </Link>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            )}

                        </table>
                    </div>
                </div>
            </div>
        </div>

        <FooterOne/>
        <ScrollToTop/>
    </>
    )
}
