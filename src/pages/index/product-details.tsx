// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import AOS from 'aos';
import product1 from '../../assets/img/gallery/product-detls/product-01.jpg'
import product2 from '../../assets/img/gallery/product-detls/product-02.jpg'
import product3 from '../../assets/img/gallery/product-detls/product-03.jpg'

import IncreDre from '../../components/incre-dre';
import NavbarOne from '../../components/navbar/navbar-one';
import FooterOne from '../../components/footer/footer-one';
import ScrollToTop from '../../components/scroll-to-top';


import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { LuEye } from 'react-icons/lu';
import { retrieveProducts } from '../shop/selector';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { serverApi } from '../../libs/config';

const productsRetriever = createSelector(
    retrieveProducts,
    (products) => ({ products })
);

export default function ProductDetails() {
    const [activeImage, setActiveImage] = useState<number>(1)
    const { id } = useParams();
    const { products } = useSelector(productsRetriever);

    const data = products.find((item) => item._id === id);


    useEffect(()=>{
        AOS.init()
    },[])

    const imagePath1 = `${serverApi}/${data.productImages[0]}`;
    const imagePath2 = `${serverApi}/${data.productImages[1]}`;
    const imagePath3 = `${serverApi}/${data.productImages[2]}`;
    return (
    <>
        <NavbarOne/>
        <div className="bg-[#F8F5F0] dark:bg-dark-secondary py-5 md:py-[30px]">
            <div className="container-fluid">
                <ul className="flex items-center gap-[10px] text-base md:text-lg leading-none font-normal text-title dark:text-white max-w-[1720px] mx-auto flex-wrap">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li><Link to="/shop-v1">Shop</Link></li>
                    <li>/</li>
                    <li className="text-primary">{data?.productName ? data?.productName : 'Classic Relaxable Chair'}</li>
                </ul>
            </div>
        </div>

        <div className="s-py-50" data-aos="fade-up">
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto flex justify-between gap-10 flex-col lg:flex-row">
                    <div className="w-full lg:w-[58%]">
                        <div className="relative product-dtls-wrapper ">
                                {data?.productDiscount && (
                                    <button className="absolute top-5 left-0 p-2 bg-[#E13939] text-lg leading-none text-white font-medium z-50">-{data?.productDiscount }%</button>
                                )}
                            <div className="product-dtls-slider">
                                <div className={activeImage === 1 ? '' : 'hidden'}><img src={data?.productImages ? imagePath1 : product1} className='w-full h-[750px] object-cover' alt="product"/></div>
                                <div className={activeImage === 2 ? '' : 'hidden'}><img src={ product2} className='w-full h-[750px] object-cover' alt="product1"/></div>
                                <div className={activeImage === 3 ? '' : 'hidden'}><img src={ product3} className='w-full h-[750px] object-cover' alt="product"/></div>
                            </div>
                            <div className="product-dtls-nav h-[600px]">
                                <div onClick={()=>setActiveImage(1)} className='mb-2 '><img src={data?.productImages ? imagePath1 : product1} alt="product"/></div>
                                <div onClick={()=>setActiveImage(2)} className='mb-2'><img src={ product2} alt="product2"/></div>
                                <div onClick={()=>setActiveImage(3)} className='mb-2'><img src={ product3} alt="product3"/></div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:max-w-[635px] w-full">
                        <div className="pb-4 sm:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk">
                            <h2 className="font-semibold leading-none">{data?.productName ? data?.productName : 'Classic Relaxable Chair'}</h2>
                            <div className="flex gap-4 items-center mt-[15px]">
                                    <span className="text-2xl sm:text-3xl text-primary leading-none block">${ data.productPrice}</span>
                            </div>

                            <p className="sm:text-lg mt-5 md:mt-7">
                                {data.productDesc}
                            </p>
                        </div>
                        <div className="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="200">
                        <IncreDre/>
                            <div className="flex gap-2 mt-4 sm:mt-6">
                                <Link to="/cart" className="btn btn-solid" data-text="Add to Cart">
                                    <span>Add to Cart</span>
                                </Link>
                                <button className="bg-white dark:bg-title dark:text-white flex items-center bg-opacity-100 justify-center gap-2 ml-auto px-1 py-[13px] leading-none text-title rounded-[140px] h-16 text-lg new-product-icon quick-view">
                                <LuEye className="dark:text-white h-[28px] w-[40px]" />
                                        <span className="mt-1 block">{ data.productViews} seen</span>
                                </button>
                            </div>
                        </div>
                        <div>
                        <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 mt-5 sm:mb-6">Choose Category :</h4>
                        <div className="flex flex-wrap gap-[10px] md:gap-[15px]">
                            <Link className="btn btn-theme-outline btn-sm shop1-button" to="../product-category" data-text="Sofa & Chair"><span>Sofa & Chair</span></Link>
                            <Link className="btn btn-theme-outline btn-sm shop1-button" to="../product-category" data-text="Lamp & Vase"><span>Lamp & Vase</span></Link>
                            <Link className="btn btn-theme-outline btn-sm shop1-button" to="../product-category" data-text="Table"><span>Table</span></Link>
                            <Link className="btn btn-theme-outline btn-sm shop1-button" to="../product-category" data-text="Wood Design"><span>Wood Design</span></Link>
                        </div>
                    </div>
                        <div className="pt-4 sm:pt-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="flex items-center gap-6">
                                <h6 className="font-normal">Share : </h6>
                                <div className="flex gap-6">
                                    <Link to="#" className="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <FaFacebookF className='size-5'/>
                                    </Link>
                                    <Link to="#" className="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <FaTwitter className='size-5'/>
                                    </Link>
                                    <Link to="#" className="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <FaInstagram className='size-5'/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="s-py-50">
            <div className="container-fluid">
                {/* <DetailTab/> */}
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>

    </>
  )
}
