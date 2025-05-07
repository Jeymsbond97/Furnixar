
import { LuEye,} from 'react-icons/lu'
import { RiShoppingBag2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Product } from '../../libs/types/product'
import { serverApi } from '../../libs/config'

interface Props{
    item: Product
}

export default function LayoutOne(props: Props) {
    const { item } = props;
    const imagePath = `${serverApi}/${item.productImages[0]}`
    return (
        <div className="group">
            <div className="relative overflow-hidden">
                <Link to={`/product-details/${item._id}`}>
                    <img className="w-full h-[450px] object-cover overflow-hidden  transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center bg-white" src={imagePath} alt="shop"/>
                </Link>
                {item.productDiscount && (
                    <div className="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#E13939] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                        {item.productDiscount}% OFF
                    </div>
                )}
                <div className="absolute z-10 top-[50%] right-3 transform -translate-y-[40%] opacity-0 duration-300 transition-all group-hover:-translate-y-1/2 group-hover:opacity-100 flex flex-col items-end gap-3">
                    <Link to="#" className="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon">
                        <RiShoppingBag2Line className="dark:text-white h-[22px] w-[20px]"/>
                        <span className="mt-1">Add to Cart</span>
                    </Link>
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
}
