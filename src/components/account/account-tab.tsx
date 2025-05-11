import { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import MemberService from '../../services/MemberService'
import { sweetErrorHandling, sweetTopSuccessAlert } from '../../libs/sweetAlert'
import { Messages } from '../../libs/config'
import { useGlobals } from '../../hooks/useGlobal'

export default function AccountTab() {
    const [current, setCurrent] = useState<string>('')
    const { setAuthMember } = useGlobals()
    const navigate=useNavigate()

    useEffect(()=>{
        setCurrent(window.location.pathname)
    }, [])

     /**  HANDLERS **/
    const handleLogoutRequest = async () => {
        try{
            const member = new MemberService();
            await member.logout();
            await sweetTopSuccessAlert("success", 700);
            setAuthMember(null);
            navigate('/login')

        }catch(err){
            console.log(err);
            sweetErrorHandling(Messages.error1);
        }
    }


    return (
        <ul className="divide-y dark:divide-paragraph text-title dark:text-white text-base sm:text-lg lg:text-xl flex flex-col justify-center leading-none">
            <li className={` py-3 lg:py-6 pl-6 lg:pl-12 ${current === '/my-profile' ? 'active text-primary' :''}`}>
                <Link className="duration-300 hover:text-primary" to="/my-profile">My Profile</Link>
            </li>
            <li className={`py-3 lg:py-6 pl-6 lg:pl-12 ${current === '/edit-account' ? 'active text-primary' :''}`}>
                <Link className="duration-300 hover:text-primary" to="/edit-account">Edit Account</Link>
            </li>
            <li className={`py-3 lg:py-6 pl-6 lg:pl-12 ${current === '/login' ? 'active text-primary' :''}`}>
                <Link onClick={handleLogoutRequest} className="duration-300 hover:text-primary" to="#" >Logout</Link>
            </li>
        </ul>
    )
}
