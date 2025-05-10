import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import NavbarOne from "../../components/navbar/navbar-one";
import bg from '../../assets/img/shortcode/breadcumb.jpg'
import AccountTab from "../../components/account/account-tab";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";

import { LuMail, LuMapPin, LuPhoneCall } from "react-icons/lu";
import Aos from "aos";
import { CartItem } from "../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobal";




interface ProfileProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

export default function MyProfile(props: ProfileProps) {
    const { cartItems, onDelete, onRemove, onDeleteAll, onAdd } = props;
    const { authMember } = useGlobals();
    const navigate = useNavigate();

    useEffect(()=>{
        Aos.init()
        if (!authMember) { navigate("/");}
    }, [authMember])


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
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">My Profile</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Profile</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                    <div className="w-full md:w-[200px] lg:w-[300px] flex-none" data-aos="fade-up" data-aos-delay="100">
                        <AccountTab/>
                    </div>
                    <div className="w-full md:w-auto md:flex-1 overflow-auto">
                        <div className="w-full max-w-[951px] bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-8 lg:p-[50px]">
                            <div data-aos="fade-up" data-aos-delay="200">
                                <h3 className="font-semibold leading-none">{ authMember?.memberNick}</h3>
                                <span className="text-sm mt-2 text-gray-500 block">{ authMember?.memberType}</span>
                            </div>
                            <p className="text-base sm:text-lg mt-5 sm:mt-8 md:mt-10 text-justify" data-aos="fade-up" data-aos-delay="300">
                                    {authMember?.memberDescr
                                        ? authMember.memberDescr
                                        : "Hey there! I haven't added any details to my profile just yet, but stay tuned—this space will soon reflect my passions, skills, and story. Everyone has a journey, and mine is still unfolding. Come back later to discover more about who I am and what drives me forward."}
                            </p>
                            <div className="mt-5 sm:mt-8 md:mt-10 grid gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="400">
                                <Link to="#" className="flex items-center gap-2">
                                    <LuPhoneCall className="text-primary size-5"/>
                                        <span className="leading-none font-medium text-base sm:text-lg">{ authMember?.memberPhone}</span>
                                </Link>
                                <Link to="#" className="flex items-center gap-2">
                                    <LuMail className="text-primary size-5"/>
                                        <span className="leading-none font-medium text-base sm:text-lg">{ authMember?.memberEmail ? authMember.memberEmail : "Email@gmail.com"}</span>
                                </Link>
                                <Link to="#" className="flex items-center gap-2">
                                    <LuMapPin className="text-primary size-5"/>
                                        <span className="leading-none font-medium text-base sm:text-lg">{ authMember?.memberAddress ? authMember.memberAddress : "Full Address Here..."}</span>
                                </Link>
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
