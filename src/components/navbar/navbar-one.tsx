import { useEffect, useState } from 'react'
import logo from '../../assets/img/svg/logo.svg'
import { Link } from 'react-router-dom'
import NavMenu from './nav-menu'

export default function NavbarOne() {
    const [toggle , setToggle] = useState<boolean>(false)
    const [current , setCurrent] = useState<string>('')
    const [scroll, setScroll] = useState<boolean>(false)


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
                        <li className={`relative ${['/cart',].includes(current) ? 'active' : ''}`}>
                            <Link to="/cart">Orders</Link>
                        </li>
                        <li className={`relative ${['/blog-v1'].includes(current) ? 'active' : ''}`}>
                            <Link to="#">Blog</Link>
                            <ul className="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[220px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">
                                <li className={`${current === '/blog-v1' ? 'active' : ''}`}><Link to="/blog-v1">Blog Layout 1</Link></li>
                                <li className={`${current === '/blog-tag' ? 'active' : ''}`}><Link to="/blog-tag">Blog Tag</Link></li>
                            </ul>
                        </li>
                        <li className={`${current === '/contact' ? 'active' : ''}`}><Link to="/contact">Contact</Link></li>
                        {/* <li className="lg:hidden"><Link to="/login">Login</Link></li> */}
                    </ul>
                </div>

                <NavMenu/>
            </div>
        </div>
    </div>
)
}
