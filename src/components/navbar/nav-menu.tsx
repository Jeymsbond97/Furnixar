import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


import { LuMinus, LuPlus, LuX} from "react-icons/lu";
import {RiShoppingBag4Line} from 'react-icons/ri'
import { Stack } from '@mui/material';
import { CartItem } from '../../libs/types/search';
import { serverApi } from '../../libs/config';


interface BasketProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

export default function NavMenu(props: BasketProps) {
const authMember = false;
const {cartItems, onAdd, onRemove, onDeleteAll, onDelete} = props
const [cart, setCart] = useState<boolean>(false)
const [count, setCount] = useState<number>(1)

const cartRef = useRef<HTMLDivElement>(null);
useEffect(() => {
    const handleEvents = (e: MouseEvent | KeyboardEvent) => {
          // Enter tugmasi bosilsa
        if (e instanceof KeyboardEvent && e.key === 'Enter') {
        setCart(false);
        }

          // Basketdan tashqariga bosilsa
        if (e instanceof MouseEvent && cartRef.current && !cartRef.current.contains(e.target as Node)) {
            setCart(false);
        }
        };

        document.addEventListener('keydown', handleEvents);
        document.addEventListener('mousedown', handleEvents);

        return () => {
        document.removeEventListener('keydown', handleEvents);
        document.removeEventListener('mousedown', handleEvents);
    };
}, []);





return (
    <div className="flex items-center gap-4 sm:gap-6">
        <Link to={authMember ? "/login" : "/register"} className="text-lg leading-none text-title dark:text-white transition-all duration-300 hover:text-primary hidden lg:block"> {authMember ? "Login" : "Signup"}</Link>
        <button className="relative hdr_cart_btn" onClick={()=> setCart(!cart)} >
            <span className="absolute w-[22px] h-[22px] bg-secondary -top-[10px] -right-[11px] rounded-full flex items-center justify-center text-xs leading-none text-white">{ cartItems.length}</span>
            <RiShoppingBag4Line className="text-title dark:text-white size-6"/>
        </button>

        <div ref={cartRef} className={`hdr_cart_popup w-80 md:w-96 absolute z-50 top-full right-0 sm:right-10 xl:right-0 bg-white dark:bg-title p-5 md:p-[30px] border border-primary ${cart ? '' : 'hidden'}`}>
            <h4 className="font-medium leading-none mb-4 text-xl md:text-2xl">
            {cartItems.length === 0
            ?  <div>Cart is empty!</div>
            :   <Stack flexDirection={"row"}>
                    <div>Cart Products: </div>
                    <DeleteForeverIcon
                    sx={{ml: "100px", mt:"4px", fontSize:"30px", color:"black", cursor: "pointer"}}
                    />
                </Stack>
            }
            </h4>
            <div>
                <div className="hdr-cart-item max-h-[320px] overflow-y-auto pr-2">
                    {cartItems.map((item: CartItem, index: number) => {
                        const imagePath = `${serverApi}/${item.image}`
                        return(
                            <div className="flex gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk group" key={index}>
                                <Link to="/product-details" className="block">
                                    <img className="w-[70px] h-[70px] object-cover" src={imagePath} alt="cart"/>
                                </Link>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] md:text-[15px] leading-none block">{item.name}</span>
                                        <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                        <span className="text-[14px] md:text-[15px] leading-none block">${item.price * item.quantity}</span>
                                    </div>
                                    <h6 className="text-base md:text-lg font-semibold !leading-none mt-[10px] mb-4">
                                        <Link to="/product-details">{ item.name}</Link>
                                    </h6>
                                    <div className="inc-dec flex items-center gap-2">
                                        <div className="dec w-6 h-6 bg-[#E8E9EA] dark:bg-dark-secondary flex items-center justify-center">
                                        <LuMinus className="text-title dark:text-white" onClick={() =>onRemove(item)}/>
                                        </div>
                                        <input className="w-6 h-auto outline-none bg-transparent text-base mg:text-lg leading-none text-title dark:text-white text-center" type="text" value={count}/>
                                        <div className="inc w-6 h-6 bg-[#E8E9EA] dark:bg-dark-secondary flex items-center justify-center">
                                        <LuPlus className="text-title dark:text-white" onClick={() =>onAdd(item)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group hover:bg-primary dark:hover:bg-primary opacity-0 group-hover:opacity-100 text-title dark:text-white duration-300 hover:text-white">
                                    <LuX onClick={() => onDelete(item)} className="text-title dark:text-white duration-300 group-hover:text-white"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="pt-5 md:pt-[30px] mt-5 md:mt-[30px] border-t border-bdr-clr dark:border-bdr-clr-drk">
                    <h4 className="mb-5 md:mb-[30px] font-medium !leading-none text-lg md:text-xl text-right">Subtotal : ${ }</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/cart" className="btn btn-outline btn-sm" data-text="View Cart">
                            <span>View Cart</span>
                        </Link>
                        <Link to="/checkout" className="btn btn-theme-solid btn-sm" data-text="Checkout">
                            <span>Checkout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[1px] bg-title/20 dark:bg-white/20 h-7 hidden sm:block"></div>
    </div>
)
}
