/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import NavbarOne from "../../components/navbar/navbar-one";
import BlogOne from "../../components/blog/blog-one";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";

import user from '../../assets/img/testimonial/tmnl-02.jpg'
import blog from '../../assets/img/thumb/blog-details.jpg'
import about from '../../assets/img/svg/about.svg'

import { blogOneData, blogTag, comments, recentPost } from "../../data/blog";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import Aos from "aos";

export default function BlogDetailsV2() {

    useEffect(()=>{
        Aos.init()
    })
    const params = useParams();
    const id:any = params.id;
    const data = blogOneData.find((item)=> item.id === parseInt(id))
  return (
    <>
        <NavbarOne/>

        <div className="mt-14">
            <div className="container-fluid">
                <div className="max-w-[940px] mx-auto" data-aos="fade-up">
                    <div>
                        <ul className="flex items-center gap-[10px] flex-wrap">
                            <li className="text-[15px] leading-none dark:text-white">{data?.date ? data?.date : '19 June, 2025'}</li>
                            <li><Link to="/blog-tag" className="inline-block text-title font-medium text-[15px] leading-none py-[10px] px-5 rounded-md bg-primary-midum">{data?.tag ? data?.tag : 'Interior'}</Link></li>
                        </ul>
                        <h1 className="text-2xl leading-snug sm:text-3xl sm:leading-snug md:text-[40px] mt-4 md:mt-6 md:leading-snug">{data?.title ? data?.title : 'How to Choose the Perfect Sofa for Living '}Room </h1>
                        <div className="mt-4 sm:mt-5 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img className="w-full h-full" src={user} alt="author"/>
                            </div>
                            <p>Jon Doue</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1720px] mx-auto mt-10" data-aos="fade-up" data-aos-delay="100">
                    <img src={data?.image ? data?.image : blog} alt="blocg" className="w-full lg:h-[750px] object-cover"/>
                </div>
                <div className="max-w-[1140px] mx-auto px-5 sm:px-[50px] md:px-[70px] lg:px-24 bg-white dark:bg-title blog-details-wrapper -mt-3 lg:-mt-12 relative z-10 rounded-xl sm:rounded-[20px] pt-8 md:pt-10">
                    <article className="pb-7 md:pb-12 prose prose-h3:!text-3xl prose-h4:!text-2xl sm:prose-lg dark:prose-p:text-white-light dark:prose-li:text-white-light dark:prose-blockquote:text-white max-w-full prose-blockquote:bg-primary prose-blockquote:bg-opacity-10 prose-blockquote:p-5 sm:prose-blockquote:p-7 md:prose-blockquote:text-2xl prose-blockquote:border-none prose-blockquote:not-italic prose-blockquote:before:content-[url('../img/icon/qute.svg')] prose-blockquote:flex prose-blockquote:gap-[10px] prose-blockquote:items-start prose-blockquote:text-xl prose-blockquote:flex-col sm:prose-blockquote:flex-row prose-li:list-none prose-li:before:relative prose-li:before:content-[url('../img/icon/check.svg')] prose-ol:!pl-0 sm:prose-ol:!pl-0 prose-ul:pl-0 sm:prose-ul:pl-0 prose-li:flex prose-li:items-start prose-li:gap-2">
                        <p>In the realm of home decor, where style meets functionality, Furnixar stands as a beacon of innovation and elegance. With a commitment to quality craftsmanship and a keen eye for design, Furnixar products have the power to transform any living space into a sanctuary of comfort and beauty.

                            From cozy living rooms to serene bedrooms, Furnixar offers a diverse range of home decor solutions that cater to every taste and lifestyle. Let's delve into some of the key elements that make Furnixar a frontrunner in the world of home decor:</p>
                        <h3>Main features of our product</h3>
                        <ul>
                            <li>All the Lorem Ipsum generators on the Internet tend to repeat predefined on the Internet.</li>
                            <li>Adipiscing lobortis interdum fringilla euismod odio of this furniture.</li>
                            <li>Nibh purus integer elementum in tellus vulputate habitasse lorem ipsum vulputate.</li>
                        </ul>
                        <p>Furnixar transcends the ordinary, offering home decor solutions that inspire and delight. With their dedication to craftsmanship, timeless design, and sustainability, Furnixar invites you to elevate your home and create a space that truly reflects your lifestyle and personality.Furnixar transcends the ordinary, offering home decor solutions that inspire and delight. </p>
                        <blockquote>
                            Nibh purus integer elementum in tellus vulputate habitasse of this is vulputate posuere habitant vel tempor varius.    
                        </blockquote>

                        <h4>Main features of our product</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, beatae dolore! Facere, neque perspiciatis laudantium adipisci fugit sequi nemo illum!</p>
                        <ol>
                            <li>All the Lorem Ipsum generators on the Internet tend to repeat predefined on the Internet.</li>
                            <li>Adipiscing lobortis interdum fringilla euismod odio of this furniture.</li>
                            <li>Nibh purus integer elementum in tellus vulputate habitasse lorem ipsum vulputate.</li>
                        </ol>

                        <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined on the Internet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, lobortis in in tortor lectus iaculis viverra. Adipiscing lobortis interdum fringilla euismod odio vitae nam pulvinar elementum. Nibh purus integer elementum in. Tellus vulputate habitasse ut vulputate posuere habitant vel tempor varius.  </p>
                    </article>

                    <div className="mt-5 sm:mt-7 lg:mt-10 py-5 sm:py-7 lg:py-10 border-y border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up">
                        <div className="flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center justify-center gap-4">
                                <h6 className="font-normal whitespace-nowrap">Tags :</h6>
                                <div className="flex flex-wrap gap-[10px]">
                                    {blogTag.map((item,index)=>{
                                        return(
                                            <Link className="btn btn-theme-outline btn-xs border-bdr-clr dark:!border-bdr-clr-drk !border-opacity-[15%] !text-base !font-normal" to="/blog-tag" data-text={item} key={index}><span>{item}</span></Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-6">
                                <h6 className="font-normal">Share : </h6>
                                <div className="flex items-center gap-6">
                                    <Link to="#" className="text-title duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <FaFacebookF className="size-5"/>
                                    </Link>
                                    <Link to="#" className="text-title duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <FaTwitter className="size-5"/>
                                    </Link>
                                    <Link to="#" className="text-title duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <FaInstagram className="size-5"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="s-py-50 flex justify-between flex-col md:flex-row gap-8 md:gap-6" data-aos="fade-up">
                        {recentPost.map((item,index)=>{
                            return(
                                <div className="md:max-w-[390px] w-full" key={index}>
                                    <h6 className="tracking-[0.5em] font-semibold mb-5 md:mb-6">{item.name}</h6>
                                    <div className="group flex sm:items-center gap-[15px]">
                                        <Link to="/blog-details-v1" className="max-w-[80px] h-auto sm:max-w-[114px] w-full flex-none block">
                                            <img className="w-full h-full object-cover" src={item.image} alt="post"/>
                                        </Link>
                                        <div className="flex-1">
                                            <ul className="flex items-center gap-[10px] flex-wrap">
                                                <li className="text-[15px] leading-none dark:text-white">{item.date}</li>
                                                <li><Link to="/blog-tag" className="inline-block text-title font-medium text-[15px] leading-none py-[10px] px-5 rounded-md bg-primary-midum group-hover:bg-primary group-hover:text-white duration-300">{item.tag}</Link></li>
                                            </ul>
                                            <h5 className="mt-3 font-medium dark:text-white leading-[1.5]"><Link to="/blog-details-v1" className="text-underline">{item.title}</Link></h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="s-py-50" data-aos="fade-up">
                        <h4 className="font-semibold leading-none mb-5 md:mb-6">Comment ( 13 )</h4>
                        <div className="p-5 sm:p-[30px] bg-[#F8F5F0] dark:bg-dark-secondary">
                            {comments.map((item,index)=>{
                                return(
                                    <div className="flex flex-col sm:flex-row items-start gap-5 first:pt-0  pt-5 md:pt-[30px] last:pb-0 pb-4 relative last:border-0 border-b border-bdr-clr dark:border-[#3c434a]" key={index}>
                                        <div className="w-[72px] h-[72px] rounded-full flex-none overflow-hidden">
                                            <img className="w-full object-cover" src={item.image} alt="comment"/>
                                        </div>
                                        <div className="max-w-[532px] w-full">
                                            <h6 className="font-medium leading-none">{item.name}</h6>
                                            <p className="mt-2 sm:mt-3">{item.decs}</p>
                                        </div>
                                        <Link to="#" className="absolute top-5 right-0 text-title leading-none dark:text-white">
                                            Reply
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="pt-3 s-pb-50 max-w-[500px] mx-auto" data-aos="fade-up">
                        <h4 className="leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Leave  a Comment</h4>
                        <div className="grid gap-[15px]">
                            <div>
                                <input className="w-full h-12 md:h-14 border border-[#3C474E] text-title bg-transparent placeholder:text-paragraph dark:text-white focus:border-primary dark:focus:border-primary dark:border-white-light dark:placeholder:text-white-light p-4 outline-none duration-300" type="text" placeholder="Full Name"/>
                            </div>
                            <div>
                                <input className="w-full h-12 md:h-14 border border-[#3C474E] text-title bg-transparent placeholder:text-paragraph dark:text-white focus:border-primary dark:focus:border-primary dark:border-white-light dark:placeholder:text-white-light p-4 outline-none duration-300" type="email" placeholder="Email Address"/>
                            </div>
                            <div>
                                <textarea className="w-full h-28 md:h-[170px] border border-[#3C474E] text-title bg-transparent placeholder:text-paragraph dark:text-white focus:border-primary dark:focus:border-primary dark:border-white-light dark:placeholder:text-white-light p-4 outline-none duration-300" name="Message" placeholder="Type your message here . . . "></textarea>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6">
                            <Link to="#" className="btn btn-theme-solid" data-text="Post Comment">
                                <span>Post Comment</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="s-py-100">
            <div className="container-fluid">
                <div className="max-w-xl mx-auto mb-8 md:mb-12 text-center" data-aos="fade-up">
                    <div>
                        <img src={about} alt="" className="size-16 mx-auto"/>
                    </div>
                    <h3 className="font-medium leading-none mt-4 md:mt-6 text-2xl md:text-3xl">Related Posts</h3>
                    <p className="mt-3">Stay informed and inspired with our latest blog posts. Explore insightful content that keeps you ahead of trends. </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="100">
                    <BlogOne/>
                </div>
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>

    </>
  )
}
