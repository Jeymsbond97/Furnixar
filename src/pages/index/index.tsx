import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import NavbarOne from '../../components/navbar/navbar-one'
import SliderOne from '../../components/banner-slider/slider-one';
import LayoutOne from '../../components/product/layout-one';
import FooterOne from '../../components/footer/footer-one';
import PartnerOne from '../../components/partner-one';
import ScrollToTop from '../../components/scroll-to-top';

import { featureOne, } from '../../data/data';

import chair from '../../assets/img/svg/chair.svg'
import sofa from '../../assets/img/svg/sofa.svg'
import bg from '../../assets/img/home-v1/choose-us-bg.jpg'
import shape1 from '../../assets/img/home-v1/shape-01.png'
import like from '../../assets/img/svg/like.svg'
import comment from '../../assets/img/svg/comment.svg'
import hand from '../../assets/img/svg/hand.svg'

// ProductCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';


import AOS from 'aos';
import BlogOne from '../../components/blog/blog-one';
import { createSelector, Dispatch } from '@reduxjs/toolkit';
import { Product } from '../../libs/types/product';
import { setNewProducts, setTopProducts, setTopUsers } from '../slice';
import { retrieveNewProducts, retrieveTopProducts, retrieveTopUsers } from '../selector';
import { useDispatch, useSelector } from 'react-redux';
import ProductService from '../../services/ProductService';
import { Member } from '../../libs/types/member';
import { serverApi } from '../../libs/config';
import MemberService from '../../services/MemberService';
import './carousel.css'
import { CartItem } from '../../libs/types/search';



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

const topUsersRetriever = createSelector(
    retrieveTopUsers,
    (topUsers) => ({topUsers})
)

interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}


function Index(props: HomeNavbarProps) {
    const { cartItems, onDelete, onRemove, onDeleteAll, onAdd} = props;
    const { setTopProducts, setTopUsers, setNewProducts} = actionDispatch(useDispatch());
    const { topProducts } = useSelector(topProductsRetriever);
    const { newProducts } = useSelector(newProductsRetriever);
    const { topUsers } = useSelector(topUsersRetriever);

    useEffect(() => {
    const product = new ProductService();
    product.getProducts({
        page: 1,
        limit: 12,
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

    const member = new MemberService();
    member.getTopUsers()
        .then( (data) => {
        setTopUsers(data)
        }
    ).catch(
    (err) => console.log(err)
    )
    }, [])

    console.log("topProducts=> ",topProducts)

    useEffect(() => {
        AOS.init();
    }, []);
return (
    <>
        <NavbarOne
            cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}
        />
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
        <div className="product-carousel-wrapper">
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
                }}
            >
                {topProducts.map((product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`
                    return (
                        <SwiperSlide key={product._id}>
                        <Link to={`/shop-v1`} className="product-card">
                            <img src={imagePath} alt={product.productName} />
                            <div className='trend'>
                                <p>Trending Now ⚡</p>
                            </div>
                            <div className="product-info">
                                <p> Products {product.productLeftCount} left</p>
                                <h6>${product.productPrice}</h6>
                            </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
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
                    {newProducts.map((item,index)=>{
                        return(
                            <LayoutOne item={item} key={index} onAdd={onAdd}/>
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
                        <BlogOne topUsers={ topUsers} />
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