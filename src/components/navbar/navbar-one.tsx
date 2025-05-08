import { useEffect, useState } from 'react'
import logo from '../../assets/img/svg/logo.svg'
import { Link } from 'react-router-dom'
import NavMenu from './nav-menu'
import { CartItem } from '../../libs/types/search';

interface HomeNavbarOneProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

export default function NavbarOne(props: HomeNavbarOneProps) {
    const { cartItems, onDelete, onRemove, onDeleteAll, onAdd} = props;
    const [toggle, setToggle] = useState<boolean>(false)
    //TODO: console delete
    console.log(setToggle)
    const [current , setCurrent] = useState<string>('')
    const [scroll, setScroll] = useState<boolean>(false)
    const authMember = true;

        useEffect(()=>{
            window.scrollTo(0,0)
            setCurrent(window.location.pathname)

            const handlerScroll=()=>{
                if(window.scrollY > 50){
                    setScroll(true)
                }else{setScroll(false)}
            }

            window.addEventListener('scroll',handlerScroll)

            return () => {
                window.removeEventListener('scroll',handlerScroll)
            };
        },[])

    return (
    <div className={`header-area default-header relative z-50 bg-white dark:bg-title ${scroll ? 'sticky-header' : ''}`}>
        <div className="container-fluid">
            <div className="flex items-center justify-between gap-x-6 max-w-[1720px] mx-auto relative py-[10px] sm:py-4 lg:py-0">
                <Link className="cursor-pointer block" to="/" aria-label="Furnixar">
                    <img src={logo} alt="" className='dark:hidden w-[120px] sm:w-[200px]'/>
                </Link>

                <div className={`main-menu absolute z-50 w-full lg:w-auto top-full left-0 lg:static bg-white dark:bg-title lg:bg-transparent lg:dark:bg-transparent px-5 sm:px-[30px] py-[10px] sm:py-5 lg:px-0 lg:py-0 ${toggle ? 'active' : ''}`}>
                    <ul className="text-lg leading-none text-title dark:text-white lg:flex lg:gap-[30px]">
                        <li className={`relative ${['/'].includes(current) ? 'active' : ''}`}>
                            <Link to="/" className="menu-item">Home</Link>
                        </li>
                        <li className={` ${['/shop-v1',].includes(current) ? 'active' : ''}`}>
                            <Link to="/shop-v1">Shop</Link>
                        </li>
                        <li className={`relative ${['/about',].includes(current) ? 'active' : ''}`}>
                            <Link to="/about">About</Link>
                        </li>
                         {/* Faqat authMember true bo'lsa Carts va Profile ko'rinadi */}
                        {authMember && (
                                <>
                                    <li className={`relative ${current === '/cart' ? 'active' : ''}`}>
                                        <Link to="/cart">Carts</Link>
                                    </li>
                                    <li className={`relative ${current === '/my-profile' ? 'active' : ''}`}>
                                        <Link to="/my-profile">Profile</Link>
                                    </li>
                                </>
                            )}
                        <li className={`${current === '/contact' ? 'active' : ''}`}>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>

                <NavMenu
                    cartItems={cartItems}
                    onDelete={onDelete}
                    onRemove={onRemove}
                    onDeleteAll={onDeleteAll}
                    onAdd={onAdd}
                />
            </div>
        </div>
    </div>
)
}
