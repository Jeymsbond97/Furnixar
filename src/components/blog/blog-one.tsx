import { Link } from 'react-router-dom'
import { Member } from '../../libs/types/member'
import { serverApi } from '../../libs/config';


interface TopUserProps{
    topUsers: Member[]
}
export default function BlogOne(props: TopUserProps) {
const { topUsers } = props;
return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-[30px]">
        {topUsers.slice(0,4).map((item, index) => {
                const imagePath = `${serverApi}/${item.memberImage}`
                return (
                    <div className="group" key={index}>
                        <Link to="/" className="overflow-hidden block">
                            <img className="duration-300 transform scale-95 group-hover:scale-110 w-full aspect-[3/4] object-cover rounded-xl" src={imagePath} alt="blog"/>
                        </Link>
                        <div className="text-center mt-4 px-3">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                                <Link to="/" className="text-underline">{item.memberNick}</Link>
                            </h1>
                        </div>
                    </div>
                )
            })}
        </div>
)
}
