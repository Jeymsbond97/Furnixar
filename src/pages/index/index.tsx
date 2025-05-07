import { useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';

import NavbarOne from '../../components/navbar/navbar-one'
import SliderOne from '../../components/banner-slider/slider-one';
import LayoutOne from '../../components/product/layout-one';
import FooterOne from '../../components/footer/footer-one';
import PartnerOne from '../../components/partner-one';
import ScrollToTop from '../../components/scroll-to-top';

import { featureOne, } from '../../data/data';
import OwlCarousel from 'react-owl-carousel';

import chair from '../../assets/img/svg/chair.svg'
import sofa from '../../assets/img/svg/sofa.svg'
import bg from '../../assets/img/home-v1/choose-us-bg.jpg'
import shape1 from '../../assets/img/home-v1/shape-01.png'
import like from '../../assets/img/svg/like.svg'
import comment from '../../assets/img/svg/comment.svg'
import hand from '../../assets/img/svg/hand.svg'


import AOS from 'aos';
import BlogOne from '../../components/blog/blog-one';
import { createSelector, Dispatch } from '@reduxjs/toolkit';
import { Product } from '../../libs/types/product';
import { setNewProducts, setTopProducts, setTopUsers } from '../slice';
import { retrieveNewProducts, retrieveTopProducts } from '../selector';
import { useDispatch, useSelector } from 'react-redux';
import ProductService from '../../services/ProductService';
import { Member } from '../../libs/types/member';
import { serverApi } from '../../libs/config';



// REDUX SLICE AND SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
    setTopProducts: (data: Product[]) => dispatch(setTopProducts(data)),
    setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
    setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
})

const topProductsRetriever = createSelector(
    retrieveTopProducts,
    (topProducts) => ({topProducts})
)

const newProductsRetriever = createSelector(
    retrieveNewProducts,
    (newProducts) => ({newProducts})
)

function Index() {
    const { setTopProducts, setNewProducts} = actionDispatch(useDispatch());
    const { topProducts } = useSelector(topProductsRetriever);
    const { newProducts } = useSelector(newProductsRetriever)

    useEffect(() => {
    const product = new ProductService();
    product.getProducts({
        page: 1,
        limit: 8,
        order: "productViews",
    }).then((data) => {
        setTopProducts(data);
    }).catch((err) => console.log(err));

    product.getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
    }).then((data) => {
        setNewProducts(data);
    }).catch((err) => console.log(err));
    }, [])

    console.log("topProducts=> ",topProducts)

    useEffect(() => {
        AOS.init();
    }, []);
    const carouselRef = useRef<OwlCarousel | null>(null);

    const goToPrevSlide = () => {
        if (carouselRef.current) {
            carouselRef.current?.prev(300);
        }
    };

    const goToNextSlide = () => {
        if (carouselRef.current) {
            carouselRef.current?.next(300);
        }
    };

return (
    <>
        <NavbarOne/>
        <SliderOne/>

        <div className="s-py-100-50 overflow-hidden">
            <div className="container-fluid">
                <div className="max-w-xl mx-auto mb-8 md:mb-12 text-center" data-aos="fade-up">
                    <div>
                        <img src={chair} alt="" className="mx-auto w-14 sm:w-24"/>
                    </div>
                    <h3 className="leading-none mt-4 md:mt-6 text-2xl md:text-3xl">Top Products</h3>
                    <p className="mt-3">Explore our curated selection of premium products, tailored to suit every need and taste. From essentials to indulgences, find your perfect fit. </p>
                </div>
                <div className="max-w-[1720px] mx-auto relative group" data-aos="fade-up" data-aos-delay="100">
                    <OwlCarousel autoplay={true} loop={true} margin={15} autoplayTimeout={5000} autoplaySpeed={2000} items={3} responsive={{0:{items:1}, 768:{items:2}, 991:{items:3} }} ref={carouselRef} className="owl-carousel hv1-pdct-ctgry-slider"> 
                        {topProducts.map((item, index) => {
                            const imagePath = `${serverApi}/${item.productImages[0]}`
                            return(
                                <Link className="relative block" to="/product-category" key={index}>
                                    <img className="w-full object-cover h-[500px]"  src={imagePath} alt="product"/>
                                    <div className="absolute bottom-7 left-0 px-5 transform w-full flex justify-start">
                                        <div className="p-[15px] bg-white dark:bg-title w-auto">
                                            <span className="md:text-xl text-primary font-medium leading-none">Left { item.productLeftCount} products</span>
                                            <h4 className="text-xl md:text-2xl mt-[10px] font-semibold leading-[1.5]">{item.productName}</h4>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </OwlCarousel>
                    <button onClick={goToPrevSlide} className="icon hv1pdct_prev w-9 h-9 md:w-14 md:h-14 flex items-center justify-center text-title duration-300 bg-white hover:bg-primary transform p-2 absolute top-1/2  -translate-y-1/2 left-0 z-[999]" aria-label="Prev Navigation">
                        <svg className="fill-current" width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.180223 7.38726L5.62434 12.8314C5.8199 13.0598 6.16359 13.0864 6.39195 12.8908C6.62031 12.6952 6.64693 12.3515 6.45132 12.1232C6.43307 12.1019 6.41324 12.082 6.39195 12.0638L1.87877 7.54516L23.4322 7.54516C23.7328 7.54516 23.9766 7.30141 23.9766 7.00072C23.9766 6.70003 23.7328 6.45632 23.4322 6.45632L1.87877 6.45632L6.39195 1.94314C6.62031 1.74758 6.64693 1.40389 6.45132 1.17553C6.25571 0.947171 5.91207 0.920551 5.68371 1.11616C5.66242 1.13441 5.64254 1.15424 5.62434 1.17553L0.180175 6.6197C-0.0308748 6.83196 -0.0308748 7.1749 0.180223 7.38726Z"/>
                        </svg>
                    </button>
                    <button onClick={goToNextSlide}  className="icon hv1pdct_next w-9 h-9 md:w-14 md:h-14 flex items-center justify-center text-title duration-300 bg-white hover:bg-primary transform p-2 absolute top-1/2 -translate-y-1/2 right-0 z-[999]" aria-label="Next Navigation">
                        <svg className="fill-current" width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.8198 6.61958L18.3757 1.17541C18.1801 0.947054 17.8364 0.920433 17.608 1.11604C17.3797 1.31161 17.3531 1.65529 17.5487 1.88366C17.5669 1.90494 17.5868 1.92483 17.608 1.94303L22.1212 6.46168L0.567835 6.46168C0.267191 6.46168 0.0234375 6.70543 0.0234375 7.00612C0.0234375 7.30681 0.267191 7.55052 0.567835 7.55052L22.1212 7.55052L17.608 12.0637C17.3797 12.2593 17.3531 12.6029 17.5487 12.8313C17.7443 13.0597 18.0879 13.0863 18.3163 12.8907C18.3376 12.8724 18.3575 12.8526 18.3757 12.8313L23.8198 7.38714C24.0309 7.17488 24.0309 6.83194 23.8198 6.61958Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div className="s-py-50-100">
            <div className="container-fluid">
                <div className="max-w-xl mx-auto mb-8 md:mb-12 text-center" data-aos="fade-up">
                    <div>
                        <img src={sofa} alt="" className="mx-auto w-14 sm:w-24"/>
                    </div>
                    <h3 className="leading-none mt-4 md:mt-6 text-2xl md:text-3xl">New Products</h3>
                    <p className="mt-3">Be the first to experience innovation with our latest arrivals. Stay ahead of the curve and discover what's new in style, technology, and more. </p>
                </div>
                <div className="max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8" data-aos="fade-up" data-aos-delay="100">
                    {newProducts.slice(0,4).map((item,index)=>{
                        return(
                            <LayoutOne item={item} key={index}/>
                        )
                    })}
                </div>
                <div className="text-center mt-7 md:mt-12">
                    <Link to="/shop-v1" className="btn btn-outline" data-text="All Products">
                        <span>All Products</span>
                    </Link>
                </div>
            </div>
        </div>

        <div className="s-py-100 bg-overlay dark:before:bg-title dark:before:bg-opacity-80" style={{backgroundImage:`url(${bg})`}} data-aos="fade-up">
            <img className="absolute top-0 right-0 w-[20%] z-[-1]" src={shape1} alt="shape"/>
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto">
                    <div className="max-w-[1186px] ml-auto">
                        <div className="max-w-xl mb-8 md:mb-12">
                            <div>
                                <img src={like} className="w-14 sm:w-24" alt="" />
                            </div>
                            <h3 className="leading-none mt-4 md:mt-6 text-2xl md:text-3xl">Why you Choose Us</h3>
                            <p className="mt-3">Choose us for unparalleled quality, exceptional service, and a commitment to your satisfaction. Join countless others who rely on us for reliability. </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-[30px]" data-aos="fade-up" data-aos-delay="100">
                            {featureOne.slice(0,4).map((item,index)=>{
                                return(
                                    <div className="why-choose-card p-6 rounded-[10px]" key={index}>
                                        <img src={item.image} alt="" className='size-12'/>
                                        <h4 className="font-semibold leading-none mt-5 sm:mt-7 text-xl md:text-2xl">{item.title}</h4>
                                        <p className="mt-[15px]">{item.desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="s-py-50" data-aos="fade-up">
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto">
                    <div className="max-w-xl mx-auto mb-8 md:mb-12 text-center">
                        <div>
                            <img src={comment} className="mx-auto w-14 sm:w-24" alt="" />
                        </div>
                        <h3 className="leading-none mt-4 md:mt-6 text-2xl md:text-3xl">Active Users</h3>
                        <h6>(Thanks for activities)</h6>
                        <p className="mt-3">
                            Explore the most active members of our community –
                            those who consistently engage, contribute, and inspire. Stay updated on top users making a
                            difference every day!
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="100">
                        <BlogOne/>
                    </div>
                </div>
            </div>
        </div>
        <div className="s-py-50-100" data-aos="fade-up">
            <div className="container-fluid">
                <div className="max-w-xl mx-auto mb-8 md:mb-12 text-center" data-aos="fade-up" data-aos-delay="100">
                    <div>
                        <img src={hand} className='mx-auto w-14 sm:w-24' alt="" />
                    </div>
                    <h3 className="leading-none mt-4 md:mt-6 text-2xl md:text-3xl">Trusted Partner</h3>
                    <p className="mt-3">Count on our trusted partnerships to deliver excellence. Collaborating with industry leaders ensures top-quality products and services for your satisfaction. </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                    <PartnerOne/>
                </div>
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>
    </>
    )
}

export default Index