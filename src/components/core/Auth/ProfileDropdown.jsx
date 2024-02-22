import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Logout } from '../../../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export const ProfileDropdown = () => {
    const ref = useRef(null);
    const { user } = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);
    useOnClickOutside(ref, () => {
        setOpen(false);
    })
    if (!user) {
        return;
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className='relative' onClick={() => {
            setOpen(true);
        }}>
            <div className='cursor-pointer flex items-center'>
                <img
                    src={user.userImage}
                    alt={`profile ${user.name}`}
                    className='bg-red-600 w-[30px] aspect-square rounded-full object-cover'
                />
                {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {
                open && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        ref={ref}
                        className='absolute top-[160%] right-0 md:translate-x-16 rounded-md md:mr-0 mr-4'
                    >
                        <Link to={"/dashboard/my-notes"}>
                            <div className='md:w-[15vw] flex w-[100vw] justify-center p-3 bg-slate-700 cursor-pointer'>
                                Notes
                            </div>
                        </Link>
                        <div className='md:w-[15vw] flex w-[100vw] justify-center p-3 bg-slate-600 cursor-pointer' onClick={() => {
                            toast.success("This feature will be available soon");
                        }}>
                            Shared Notes
                        </div>
                        <div className='md:w-[15vw] flex w-[100vw] justify-center p-3 bg-slate-700 cursor-pointer items-center text-red-500 gap-3 font-semibold' onClick={() => {
                            dispatch(Logout(navigate, false))
                        }}>
                            Logout
                            <IoIosLogOut className='text-red-300' />
                        </div>
                    </div>
                )
            }
        </div>
    )
}
