import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useSelector } from 'react-redux'
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

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const matchButtonRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const { token } = useSelector((state) => state.auth)
    return (
        <div className='bg-black text-white'>
            <div className='w-[9/11] flex justify-around py-4 items-center'>
                <Link to={"/"}>
                    <div className='select-none cursor-pointer'>
                        <img src={Logo} alt='HomeLogo' height={90} width={90} />
                    </div>
                </Link>
                <div>
                    <ul className='flex gap-4'>
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
                    <div className='flex gap-5'>
                        {
                            navButton.map((button, index) => (
                                <Link to={button.linkTo} key={index}>
                                    <button className={`${matchButtonRoute(button?.linkTo) ? "bg-slate-600" : "bg-slate-800"} px-2 py-1 rounded-lg `}>{button.topic}</button>
                                </Link>
                            ))
                        }
                    </div>
                }
                {
                    (token !== null) &&
                    <Link to={"/dashboard/my-notes"}>
                        <div className='text-white bg-slate-700 py-2 px-2 cursor-pointer rounded-lg hover:scale-110 transit duration-300'>
                            Go to DashBoard
                        </div>
                    </Link>
                }

            </div>
        </div>
    )
}
