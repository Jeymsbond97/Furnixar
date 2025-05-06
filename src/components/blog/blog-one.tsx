import { blogData } from '../../data/data'
import { Link } from 'react-router-dom'

export default function BlogOne() {
return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-[30px]">
            {blogData.slice(0,5).map((item,index)=>{
                return(
                    <div className="group" key={index}>
                        <Link to="/" className="overflow-hidden block">
                            <img className="duration-300 transform scale-100 group-hover:scale-110 w-full" src={item.image} alt="blog"/>
                        </Link>
                        <div className="text-center mt-4 px-3">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                                <Link to="/" className="text-underline">{item.title}</Link>
                            </h1>
                        </div>
                    </div>
                )
            })}
        </div>
)
}
