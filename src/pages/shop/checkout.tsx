import { Link, useNavigate } from "react-router-dom";
import NavbarOne from "../../components/navbar/navbar-one";

import bg from '../../assets/img/shortcode/breadcumb.jpg'

import { useEffect, useState, } from "react";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";
import Aos from "aos";
import { CartItem } from "../../libs/types/search";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveProcessOrders } from "./orderSelector";
import { useGlobals } from "../../hooks/useGlobal";
import { useSelector } from "react-redux";
import { Messages, serverApi } from "../../libs/config";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../libs/sweetAlert";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../libs/enums/order.enum";
import { OrderUpdateInput } from "../../libs/types/order";
import { T } from "../../libs/types/common";


interface CheckoutProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

/**  REDUX SLICE & SELECTOR  **/
const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({processOrders}),
);

export default function Checkout(props: CheckoutProps) {
    const { cartItems, onDelete, onRemove, onDeleteAll, onAdd } = props;
    const {authMember, setOrderBuilder} = useGlobals()
    const { processOrders } = useSelector(processOrdersRetriever);
    const navigate = useNavigate()
    const [memberNick, setMemberNick] = useState<string>("");
    const [memberEmail, setMemberEmail] = useState<string>("");
    const [memberPhone, setMemberPhone] = useState<string>("");
    const [memberAddress, setMemberAddress] = useState<string>("");

    useEffect(() => {
        Aos.init();
        if (!authMember) {
            navigate('/');
        }
    }, [authMember]);

    /**   HANDLER   **/
    const handleUsername = (e: T) => {
        setMemberNick(e.target.value);
    };

    const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
    };

    const handleEmail = (e: T) => {
    setMemberEmail(e.target.value);
    };

    const handleAddress = (e: T) => {
        setMemberAddress(e.target.value);
        };

const finishOrderHandler = async (e: T) => {
    try{
        if (!authMember) throw new Error(Messages.error2);
        const isFullFill =
        memberNick !== "" && memberEmail !== "" && memberPhone !== "" && memberAddress !== "";
        if (!isFullFill) throw new Error(Messages.error3);
        const orderId = e.target.value;
        const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.FINISH,
        };

        const confirmation = window.confirm("Are you sure finish your order?");
        if(confirmation){
            const order = new OrderService();
            await order.updateOrder(input);
            await sweetTopSuccessAlert("Your order submited", 700);
            // FORWARD FINISH
            setOrderBuilder(new Date());
            navigate('/shop-v1')

        }
    }
    catch(err){
        console.log(err);
        sweetErrorHandling(err).then();
        }
    };

    const CancelOrderHandler = async (e: T) => {
        try{
            if(!authMember) throw new Error(Messages.error2);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.PAUSE
            };

            const confirmation = window.confirm("Are you sure cancel your order ?");
            if(confirmation){
                const order = new OrderService();
                await order.updateOrder(input);
                await sweetTopSuccessAlert("Your order canceled", 700);
                // FORWARD FINISH
                setOrderBuilder(new Date());
                navigate('/cart')

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
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Checkout</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4 flex-wrap">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Checkout</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container">
            <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-[30px] lg:gap-[70px]">
                <div className="bg-[#FAFAFA] dark:bg-dark-secondary p-[30px] md:p-[40px] lg:p-[50px] border border-[#17243026] border-opacity-15 rounded-xl" data-aos="fade-up" data-aos-delay="100">
                    <p className='mb-5 w-full bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300 whitespace-normal'>Are you missing your coupon code ?
                    <button className='ml-1 add-coupon-code underline text-[#209A60]'> Click here to add</button>
                    </p>
                    <h4 className="font-semibold leading-none text-xl md:text-2xl mb-6 md:mb-[30px]">Billing Information</h4>
                    <div className="grid gap-5 md:gap-6">
                        <div>
                            <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Full Name <span className="text-red-500">*</span></label>
                            <input  onChange={handleUsername} className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" placeholder="Enter your full name"/>
                        </div>
                        <div>
                            <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Email <span className="text-red-500">*</span></label>
                            <input  onChange={handleEmail}className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="email" placeholder="Enter your email address"/>
                        </div>
                        <div>
                            <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Phone No. <span className="text-red-500">*</span></label>
                            <input  onChange={handlePhone} className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="number" placeholder="Type your phone number" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                        <div>
                            <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">
                                Town / City
                            </label>
                            <select className="nice-select select-active p-4 !bg-white dark:!bg-dark-secondary">
                            <option value={1}>Seoul</option>
                            <option value={2}>Pusan</option>
                            <option value={3}>Jeonju</option>
                            <option value={4}>Suwon</option>
                            <option value={5}>Asan</option>
                            <option value={6}>Daejon</option>
                            <option value={7}>Jeju</option>
                            <option value={8}>Yeosu</option>
                            <option value={9}>Daegu</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Zip Code</label>
                            <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" placeholder="1217"/>
                        </div>
                        </div>
                        <div>
                            <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block"> Full Address <span className="text-red-500">*</span> </label>
                            <input onChange={handleAddress} className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" placeholder="Your full address"/>
                        </div>
                        <div>
                            <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Optional Address</label>
                            <textarea className="w-full h-[120px] bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" name="Message" placeholder="Type your message"></textarea>
                        </div>
                    </div>
                </div>

                <div>
                    {processOrders && processOrders.length > 0 &&processOrders[0]?._id && (
                        <div
                            key={processOrders[0]._id}
                            className="bg-[#FAFAFA] dark:bg-dark-secondary pt-[30px] md:pt-[40px] lg:pt-[50px] px-[30px] md:px-[40px] lg:px-[50px] pb-[30px] border border-[#17243026] border-opacity-15 rounded-xl"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <h4 className="font-semibold leading-none text-xl md:text-2xl mb-6 md:mb-10">
                            Product Information
                            </h4>
                            <div className="grid gap-5 mg:gap-6">
                            {processOrders[0].orderItems.map((item) => {
                                const product = processOrders[0].productData.find(p => p._id === item.productId);
                                const imagePath = `${serverApi}/${product?.productImages[0]}`;

                                return (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between gap-5"
                                >
                                    <div className="flex items-center gap-3 md:gap-4 lg:gap-6 cart-product flex-wrap">
                                    <div className="w-16 sm:w-[70px] flex-none">
                                        <img className="w-[70px] h-[70px] object-cover" src={imagePath} alt={product?.productName || "product"} />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-semibold leading-none mt-2">
                                        <Link to="#">{product?.productName}</Link>
                                        </h5>
                                    </div>
                                    </div>
                                    <h6 className="leading-none">${item.itemPrice * item.itemQuantity}</h6>
                                </div>
                                );
                            })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk text-right flex justify-end flex-col w-full ml-auto mr-0">
                            <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium">
                                <span>Sub Total:</span>
                                <span>${processOrders[0].orderTotal - processOrders[0].orderDelivery}</span>
                            </div>
                            <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <span>Shipping Fee:</span>
                                <span>${processOrders[0].orderDelivery}</span>
                            </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk">
                            <div className="flex justify-between flex-wrap font-semibold leading-none text-2xl md:text-3xl">
                                <span>Total:</span>
                                <span>${processOrders[0].orderTotal}</span>
                            </div>
                            </div>
                        </div>
                    )}
                    <div className="mt-7 md:mt-12" data-aos="fade-up" data-aos-delay="200">
                        <h4 className="font-semibold leading-none text-xl md:text-2xl mb-6 md:mb-10">Payment Method</h4>
                        <div className="flex gap-5 sm:gap-8 md:gap-12 flex-wrap">
                            <div>
                                <label className="flex items-center gap-[10px] categoryies-iteem">
                                    <input className="appearance-none hidden" type="radio" name="item-type"/>
                                    <span className="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                        <svg className="duration-300 opacity-0" width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                        </svg>
                                    </span>
                                    <span className="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">Cash On Delivery</span>
                                </label>
                                <p className="ml-6 text-[15px] leading-none mt-2">Time ( 07 - 10 ) Days</p>
                            </div>
                            <div>
                                <label className="flex items-center gap-[10px] categoryies-iteem">
                                    <input className="appearance-none hidden" type="radio" name="item-type"/>
                                    <span className="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                        <svg className="duration-300 opacity-0" width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                        </svg>
                                    </span>
                                    <span className="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">Debit / Credit Card</span>
                                </label>
                                <p className="ml-6 text-[15px] leading-none mt-2">Time ( 07 - 10 ) Days</p>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-8 md:mt-10">
                            <label className="flex items-center gap-2 iam-agree">
                                <input className="appearance-none hidden" type="checkbox" name="categories"/>
                                <span className="w-6 h-6 rounded-[5px] border-2 border-title dark:border-white flex items-center justify-center duration-300">
                                    <svg  className="duration-300 opacity-0 text-title dark:text-white fill-current" width="15" height="12" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.3819 0.742676L6.10461 11.8998L2.25731 8.06381L0.763672 9.55745L6.20645 15.0002L20 2.32686L18.3819 0.742676Z"/>
                                    </svg>
                                </span>
                                <span className="text-base sm:text-lg text-title dark:text-white leading-none sm:leading-none select-none inline-block transform translate-y-[3px]"><Link to="../terms-and-conditions">Agree all terms & Conditions</Link> </span>
                            </label>
                        </div>
                        <div key={processOrders[0]._id}
                            className="mt-4 md:mt-6 flex flex-wrap gap-3">
                            <button value={processOrders[0]._id} onClick={CancelOrderHandler} className="btn btn-outline" data-text="Cancel order"><span>Cancel order</span></button>
                            <button value={processOrders[0]._id} onClick={finishOrderHandler} className="btn btn-theme-solid" data-text="Submit order"><span>Submit order</span></button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>

    </>
)
}
