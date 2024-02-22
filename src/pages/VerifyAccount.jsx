import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/operations/authAPI';

export const VerifyAccount = () => {
    const { loading, signUpData } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!signUpData) {
            toast.error("Fill alll data");
            navigate("/signup");
        }
    })
    const [otp, setOtp] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const {
            name,
            email,
            password,
            confirmPassword
        } = signUpData;
        dispatch(signup(name, email, password, confirmPassword, otp, navigate));
    }

    return (
        <div className='h-[89vh] bg-slate-900 flex items-center justify-center text-white'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div>
                        <h1 className='text-2xl font-semibold ml-8 mb-4'>
                            Verify Email
                        </h1>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-slate-400 w-[85%]'>
                                A verification code has been sent to you. Enter the code below
                            </p>
                            <form onSubmit={handleSubmit} className='flex flex-col'>
                                <input
                                    type='text'
                                    name='otp'
                                    required
                                    value={otp}
                                    onChange={(e) => { setOtp(e.target.value) }}
                                    placeholder='Enter OTP here'
                                    className='border-2 border-black rounded-md md:w-96 w-[95vw] p-2 border-b-4 border-b-emerald-400 text-slate-800 outline-none'
                                />
                                <button type='submit' className="bg-yellow-400 text-black px-20 py-2 rounded-md mt-6 hover:scale-110 transition-all duration-300 font-medium">Verify Email</button>
                            </form>
                        </div >
                    </div>
                )
            }
        </div >
    )
}
