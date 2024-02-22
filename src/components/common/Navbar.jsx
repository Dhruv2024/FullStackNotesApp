import React, { useRef, useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";
import { ProfileDropdown } from '../core/Auth/ProfileDropdown'
import useOnClickOutside from '../../hooks/useOnClickOutside';
export const Navbar = () => {
    const navEle = [
        {
            topic: "Home",
            linkTo: "/",
        },
        {
            topic: "About",
            linkTo: "/about",
        },
        {
            topic: "Contact",
            linkTo: "/contact"
        }
    ]

    const navButton = [
        {
            topic: "SignUp",
            linkTo: "/signup",
        },
        {
            topic: "Login",
            linkTo: "/login",
        }
    ]

    const mobileNavbar = [
        {
            topic: "Home",
            linkTo: "/",
        },
        {
            topic: "About",
            linkTo: "/about",
        },
        {
            topic: "Contact",
            linkTo: "/contact"
        },
        {
            topic: "SignUp",
            linkTo: "/signup",
        },
        {
            topic: "Login",
            linkTo: "/login",
        }
    ]
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const matchButtonRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    const [show, setShow] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        setShow(false);
    })
    return (
        <div className='bg-black text-white w-[100vw]'>
            <div className='md:w-[9/11] flex md:justify-around justify-between py-4 items-center'>
                <Link to={"/"}>
                    <div className='select-none cursor-pointer'>
                        <img src={Logo} alt='HomeLogo' height={90} width={90} />
                    </div>
                </Link>
                <div>
                    <ul className='md:flex gap-4 md:visible invisible hidden'>
                        {
                            navEle.map((ele, index) => (
                                <Link to={ele?.linkTo} key={index}>
                                    <li className={`${matchRoute(ele?.linkTo) ? "text-red-500" : "text-white"}`}>
                                        {ele.topic}
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
                {
                    (token === null) &&
                    <div className='gap-5 md:visible md:flex invisible hidden'>
                        {
                            navButton.map((button, index) => (
                                <Link to={button.linkTo} key={index}>
                                    <button className={`${matchButtonRoute(button?.linkTo) ? "bg-slate-600" : "bg-slate-800"} px-2 py-1 rounded-lg `}>{button.topic}</button>
                                </Link>
                            ))
                        }
                    </div>
                }


                {/* mobile screen navbar */}
                {
                    token === null &&
                    (<div className="md:invisible md:hidden flex items-center">
                        <div className={`text-2xl mr-8 transition-opacity duration-300`} onClick={() => {
                            setShow(!show)
                        }}>
                            {
                                !show ? <IoReorderThreeOutline /> : <IoCloseOutline />
                            }
                        </div>
                    </div>
                    )
                }
                {
                    show && (
                        <div className="absolute right-0 text-xl w-[60vw] z-10 md:invisible md:hidden lg:invisible lg:hidden top-[6.5vh]" ref={ref}>
                            {/* navlinks */}
                            <ul className="flex gap-2 flex-col pb-2">
                                {mobileNavbar.map((link, index) => (
                                    <Link to={link.linkTo} key={index}>
                                        <li
                                            className={`${matchRoute(link?.linkTo)
                                                && "text-red-500"
                                                }
                                             text-center p-2 bg-slate-600
                                            `}
                                            onClick={() => setShow(false)}
                                        >
                                            {link.topic}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )
                }
                {
                    // (token !== null) &&
                    // <div className='flex gap-x-3'>
                    //     <Link to={"/dashboard/my-notes"}>
                    //         <div className='text-white bg-slate-700 py-2 px-2 cursor-pointer rounded-lg hover:scale-110 transit duration-300'>
                    //             Go to DashBoard
                    //         </div>
                    //     </Link>
                    //     <div className='text-white bg-slate-700 py-2 px-2 cursor-pointer rounded-lg hover:scale-110 transit duration-300' onClick={() => {
                    //         dispatch(Logout(navigate, false))
                    //     }}>
                    //         Logout
                    //     </div>
                    // </div>
                }
                {
                    (token !== null) && <ProfileDropdown />
                }
            </div>
        </div>
    )
}
