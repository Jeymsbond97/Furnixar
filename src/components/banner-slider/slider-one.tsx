import OwlCarousel from 'react-owl-carousel';
import img1 from '../../assets/img/shortcode/carousel/Summer.png'
import img3 from '../../assets/img/home-v1/banner-02.png'
import { Link } from 'react-router-dom';

export default function SliderOne() {
    return (
            <OwlCarousel className="carousel-slider-four" loop items={1}>
                <div className="relative pt-12 md:pt-20 xl:pt-[100px] pb-12 sm:pb-24 px-[15px] sm:px-12 bg-[#F5F5F5] dark:bg-title">
                    <div className="container">
                        <div className="max-w-[1720px] mx-auto">
                            <div className="absolute top-5 right-[30%] z-10 hidden lg:block shape-01">
                                <svg className="w-[300px] xl:w-[500px] h-[250px] xl:h-[409px]" viewBox="0 0 501 410" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M93.5685 350.941C17.9186 286.326 -22.6142 169.412 13.177 95.6561C48.7857 21.5837 161.217 -9.19765 268.179 2.36595C374.958 13.6135 477.265 67.4732 497.265 147.363C516.948 227.436 454.823 333.672 367.72 380.59C280.8 427.824 169.535 415.374 93.5685 350.941Z" fill="#627952" fill-opacity="0.1"/>
                                </svg>
                                <div className="absolute top-1/4 left-[10%] xl:left-[20%] z-30">
                                    <h4 className="leading-none text-[#627952] dark:text-[#627952] font-semibold">$110</h4>
                                    <h3 className="leading-none mt-4">Aurora Flexible Vase</h3>
                                    <div className="group mt-[10px]">
                                        <Link to="/product-details" className="text-lg leading-none text-title font-medium  text-underline dark:text-white">Buy Now</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute z-10 right-[10%] xl:right-[40%] bottom-1/4 hidden md:block shape-02">
                                <svg width="102" height="83" viewBox="0 0 102 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.1541 77.5842C12.1957 69.0178 -1.68588 48.5308 1.41039 32.4302C4.45506 16.278 24.5808 4.51219 45.8419 1.2095C67.0514 -2.14479 89.6025 2.96406 97.6012 17.3617C105.548 31.811 99.0462 55.5491 84.6485 69.1211C70.3024 82.7447 48.1641 86.0989 30.1541 77.5842Z" fill="#627952"/>
                                </svg> 
                                <div className="text-center absolute top-1/2 left-1/2 transform z-30 -translate-x-1/2 -translate-y-1/2">
                                    <h3 className="font-semibold leading-none text-white">-5%</h3>
                                    <p className="leading-none text-white mt-1">OFF</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-8 flex-col sm:flex-row">
                                <div className="relative z-10 sm:max-w-[632px] w-full slider-content">
                                    <div className="flex items-end content-top">
                                        <span className="font-bold text-5xl sm:text-7xl xl:text-9xl text-title leading-none dark:text-white">2025</span>
                                        <img className="-ml-5 sm:-ml-10 w-[150px] sm:w-[200px] lg:w-[250px] xl:w-full" src={img1} alt="summer"/>
                                    </div>
                                    <h2 className="mt-[10px] font-normal text-3xl sm:text-4xl xl:text-5xl !leading-[1.3] dark:text-white">Exciting New Arrivals Unmissable Just Landed</h2>
                                    <p className="dark:text-white-light mt-3 md:mt-4 sm:max-w-[450px] xl:max-w-full">Discover the latest must-have arrivals! Elevate your style with our newest collection of trendsetting items. Find your perfect fit with our diverse product.</p>
                                    <div className="button mt-4 md:mt-6">
                                        <Link className="btn btn-outline" to="/shop-v2" data-text="Shop Now"><span>Shop Now</span></Link>
                                    </div>
                                </div>
                                <div className="sm:max-w-[750px] w-full">
                                    <img className="slider-img" src={img3} alt="banner-slider"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OwlCarousel>
    )
}
