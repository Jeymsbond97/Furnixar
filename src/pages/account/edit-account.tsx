import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import bg from '../../assets/img/shortcode/breadcumb.jpg'

import NavbarOne from '../../components/navbar/navbar-one'
import AccountTab from '../../components/account/account-tab'
import FooterOne from '../../components/footer/footer-one'
import ScrollToTop from '../../components/scroll-to-top'
import { useNavigate }  from 'react-router-dom'

import Aos from 'aos'
import { CartItem } from '../../libs/types/search'
import { Messages, serverApi } from '../../libs/config'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert'
import { T } from '../../libs/types/common'
import { useGlobals } from '../../hooks/useGlobal'
import { MemberUpdateInput } from '../../libs/types/member'
import MemberService from '../../services/MemberService'

interface EditAccountProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}



export default function EditAccount(props: EditAccountProps) {
    const { cartItems, onDelete, onRemove, onDeleteAll, onAdd } = props;
    const { authMember, setAuthMember} = useGlobals();
    const navigate = useNavigate()
    const [ memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
    ? `${serverApi}/${authMember.memberImage}`
    : ""
)
    useEffect(() => {
        Aos.init()
    }, []);

    const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
        {
            memberNick: authMember?.memberNick,
            memberPhone: authMember?.memberPhone,
            memberAddress: authMember?.memberAddress,
            memberDescr: authMember?.memberDescr,
            memberImage: authMember?.memberImage,
            memberEmail: authMember?.memberEmail,
        }
    )


    /**     HANDLERS     **/

const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({...memberUpdateInput})
};

const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({...memberUpdateInput})
};

const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({...memberUpdateInput})
};

const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDescr = e.target.value;
    setMemberUpdateInput({...memberUpdateInput})
};

const memberEmailHandler = (e: T) => {
        memberUpdateInput.memberEmail = e.target.value;
        setMemberUpdateInput({...memberUpdateInput})
    };

    const handleSubmitButton = async () => {
        try{
        if(!authMember) throw new Error(Messages.error2);

        const hasAnyField = Object.values(memberUpdateInput).some(value => value !== "");
        if (!hasAnyField) {
            throw new Error("Hech qanday maydon to‘ldirilmagan!");
        }

            const member = new MemberService();
            const result = await member.updateMember(memberUpdateInput);
            setAuthMember(result);

            await sweetTopSmallSuccessAlert(" Updated successfully!", 700);
            navigate('/my-profile')
        }
        catch(err){
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    const fileType = file.type,
        validateImageTypes = ['image/jpg', "image/png", "image/jpeg"];

    if(!validateImageTypes.includes(fileType)) {
        sweetErrorHandling(Messages.error5).then();
    }else{
    if(file){
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({...memberUpdateInput});
        setMemberImage(URL.createObjectURL(file));
    }
    }
}
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
            <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Edit Account</h2>
            <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><Link to="/">Home</Link></li>
                <li>/</li>
                <li className="text-primary">Account</li>
            </ul>
        </div>
    </div>

    <div className="s-py-100">
        <div className="container-fluid">
            <div className="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                <div className="w-full md:w-[200px] lg:w-[300px] flex-none" data-aos="fade-up" data-aos-delay="100">
                    <AccountTab/>
                </div>
                <div className="w-full md:w-auto md:flex-1 overflow-auto" data-aos="fade-up" data-aos-delay="300">
                    <div className="w-full max-w-[951px] bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-8 lg:p-[50px]">
                        <div className="flex items-start flex-col lg:flex-row gap-5 sm:gap-6">
                            <div className="grid gap-5 sm:gap-6 w-full lg:w-1/2">
                                <div>
                                    <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Upload Picture</label>
                                        <input
                                        onChange={handleImageViewer}
                                        type="file"
                                        accept="image/*"
                                        placeholder="Enter your full name"
                                        className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-3 outline-none duration-300 file:bg-transparent file:border-0 file:text-inherit file:p-0 cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Full Name</label>
                                            <input onChange={memberNickHandler} className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" placeholder={ authMember.memberNick} />
                                </div>
                                <div>
                                    <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Phone No.</label>
                                    <input onChange={memberPhoneHandler} className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300 appearance-none" type="number" placeholder={ authMember.memberPhone}/>
                                </div>
                                <div>
                                    <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Mail</label>
                                    <input onChange={memberEmailHandler} className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="email" placeholder="Enter your email address"/>
                                </div>
                            </div>
                            <div className="grid gap-5 sm:gap-6 w-full lg:w-1/2">
                                <div>
                                    <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Location</label>
                                    <input onChange={memberAddressHandler} className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" placeholder="Enter your location"/>
                                </div>
                                <div>
                                    <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Bio</label>
                                    <textarea onChange={memberDescriptionHandler} className="w-full h-28 md:h-[168px] bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" name="Message" placeholder="Write your bio . . ."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-8 md:mt-12">
                            <button onClick={handleSubmitButton} className="btn btn-solid" data-text="Save Change">
                                <span>Save Change</span>
                            </button>
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
