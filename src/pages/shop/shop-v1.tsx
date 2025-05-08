import {   useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavbarOne from "../../components/navbar/navbar-one";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";
import SelectOne from "../../components/product/select-one";

import bg from '../../assets/img/shortcode/breadcumb.jpg'

import Aos from "aos";
import { LuEye } from "react-icons/lu";
import { RiShoppingBag2Line } from "react-icons/ri";
import { retrieveProducts } from "./selector";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../libs/types/product";
import { setProducts } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../libs/config";
import { ProductCollection } from "../../libs/enums/product.enum";
import { CartItem } from "../../libs/types/search";

/**  REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data))
});

const productsRetriever = createSelector(
    retrieveProducts,
    (products) => ({products}),
)

interface ProductsProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

export default function ShopV1(props: ProductsProps) {
const { cartItems, onDelete, onRemove, onDeleteAll, onAdd} = props;
const {setProducts} = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);
    const [activeCollection, setActiveCollection] = useState<ProductCollection | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [ productSearch, setProductSearch ] = useState<ProductInquiry>({
        page: 1,
        limit: 16,
        order: "createdAt",
        search: " ",
    });

    useEffect(()=>{
        Aos.init()
    })

    useEffect(() => {
        const product = new ProductService()
        product.getProducts(productSearch)
        .then((date) => setProducts(date))
        .catch((err) => console.log(err))
    }, [productSearch]);

    useEffect(() => {
        if(searchText === ""){
            productSearch.search = "";
            setProductSearch({...productSearch});
        }
    }, [searchText])



    /**  HANDLERS **/
    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({ ...productSearch });
        setActiveCollection(collection)
    };

    const searchProductHandler = () =>{
        productSearch.search = searchText;
        setProductSearch({...productSearch})
    };

return (
    <>
        <NavbarOne
            cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}
        />

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Shop</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Shop</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container-fluid">
                <div className="flex items-start justify-between gap-8 max-w-[1720px] mx-auto flex-col lg:flex-row border-b border-bdr-clr dark:border-bdr-clr-drk pb-8 md:pb-[50px]" data-aos="fade-up" data-aos-delay="100">
                    <div>
                        <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Choose Category</h4>
                        <div className="flex flex-wrap gap-[10px] md:gap-[15px]">
                            <Link onClick={() => searchCollectionHandler(ProductCollection.SOFA)}
                                className={`btn btn-theme-outline btn-sm shop1-button
                                ${activeCollection === ProductCollection.SOFA ? 'bg-primary' : ''}`} to={'#'}
                                data-text="Sofa & Chair">
                                <span>Sofa & Chair</span>
                            </Link>
                            <Link onClick={() => searchCollectionHandler(ProductCollection.LAMP)}
                                className={`btn btn-theme-outline btn-sm shop1-button
                                ${activeCollection === ProductCollection.LAMP? 'bg-primary' : ''}`}
                                data-text="Lamp & Vase" to={'#'}>
                                <span>Lamp & Vase</span>
                            </Link>
                            <Link onClick={() => searchCollectionHandler(ProductCollection.TABLE)}
                                className={`btn btn-theme-outline btn-sm shop1-button
                                ${activeCollection === ProductCollection.TABLE ? 'bg-primary' : ''}`}
                                data-text="Table" to={'#'}>
                                <span>Table</span>
                            </Link>
                            <Link onClick={() => searchCollectionHandler(ProductCollection.WOOD)}
                                className={`btn btn-theme-outline btn-sm shop1-button
                                ${activeCollection === ProductCollection.WOOD ? 'bg-primary' : ''}`}
                                data-text="Wood Design" to={'#'}>
                                <span>Wood Design</span>
                            </Link>
                        </div>
                    </div>
                    <div className="max-w-[562px] w-full grid sm:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Search</h4>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter") searchProductHandler();
                                }}
                                className="w-full py-[14px] px-5 border border-title dark:border-white-light text-title dark:text-white font-medium leading-none outline-none bg-transparent placeholder:text-title dark:placeholder:text-white"
                                />
                        </div>
                        <div>
                            <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Sort By Options</h4>
                            <SelectOne setProductSearch={setProductSearch} />
                        </div>
                    </div>
                </div>

                <div className="max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 pt-8 md:pt-[50px]" data-aos="fade-up" data-aos-delay="300">
                    {products.map((item, index) => {
                            const imagePath = `${serverApi}/${item.productImages[0]}`
                        return(
                            <div className="group" key={index}>
                                        <div className="relative overflow-hidden">
                                            <Link to={`/product-details/${item._id}`}>
                                                <img className="w-full h-[450px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center bg-white" src={imagePath} alt="shop"/>
                                            </Link>
                                            {item.productDiscount && (
                                                <div className="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#E13939] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                                                    {item.productDiscount}% OFF
                                                </div>
                                            )}
                                            <div className="absolute z-10 top-[50%] right-3 transform -translate-y-[40%] opacity-0 duration-300 transition-all group-hover:-translate-y-1/2 group-hover:opacity-100 flex flex-col items-end gap-3">
                                                <button  onClick={(e)=> {
                                                    onAdd({
                                                    _id: item._id,
                                                    quantity: 1,
                                                    name: item.productName,
                                                    price: item.productPrice,
                                                    image: item.productImages[0],
                                                })
                                                e.stopPropagation();
                                            }} className="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon">
                                                    <RiShoppingBag2Line className="dark:text-white h-[22px] w-[20px]"/>
                                                    <span className="mt-1">
                                                        Add to Cart
                                                    </span>
                                                </button>
                                                <button className="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon quick-view">
                                                    <LuEye className="dark:text-white h-[22px] w-[20px]"/>
                                                    <span className="mt-1">{ item.productViews}</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="md:px-2 lg:px-4 xl:px-6 lg:pt-6 pt-5 flex gap-4 md:gap-5 flex-col">
                                            <h4 className="font-medium leading-none dark:text-white text-lg">${item.productPrice}</h4>
                                            <div>
                                                <h5 className="font-bold dark:text-white text-xl leading-[1.5]">
                                                    <Link to={`/product-details/${item._id}`} className="text-underline">{item.productName}</Link>
                                                </h5>
                                                <ul className="flex items-center font-normal gap-2 mt-1">
                                                    <li style={{color: "red"}}>Left products</li>
                                                    <li className="dark:text-gray-100">( {item.productLeftCount} )</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                        )
                    })}
                </div>
                <div className="text-center mt-7 md:mt-12">
                    <Link to="/shop-v1" className="btn btn-outline" data-text="Load More">
                        <span>Load More</span>
                    </Link>
                </div>
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>
    </>
    )
}
