import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../services/operations/authAPI';
import { setSignupData } from '../slices/authSlice';
import toast from 'react-hot-toast';
import signUpImage from '../assets/images/SignupImage.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";


export const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    function handleOnChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const { password, confirmPassword } = formData;
    function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }
        if (password.length < 8) {
            toast.error("Password should have minimum 8 characters");
            return;
        }
        dispatch(setSignupData(formData));
        dispatch(sendOtp(formData.email, navigate));

        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    }
    return (
        <div className='flex items-center justify-center md:gap-20 bg-slate-900 md:h-[89vh] text-slate-300 md:flex-row flex-col-reverse gap-12 md:pt-0 pt-5'>
            {/* <button onClick={() => {
                dispatch(sendOtp("adhruv674@gmail.com", navigate));
            }}>see</button> */}

            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center md:h-[80vh] gap-4 md:pl-0 pl-[1px]'>
                <div className='flex flex-col gap-3'>
                    <label>
                        <p className='ml-2'>Name: </p>
                        <input
                            type='text'
                            required
                            name='name'
                            value={formData.name}
                            onChange={handleOnChange}
                            placeholder='Enter Your Name'
                            className='border-2 border-black rounded-md md:w-96 w-[85vw] p-2 border-b-4 border-b-fuchsia-500 text-slate-800 outline-none'
                        />
                    </label>
                    <label>
                        <p className='ml-2'>Email: </p>
                        <input
                            type='email'
                            required
                            name='email'
                            value={formData.email}
                            onChange={handleOnChange}
                            placeholder='Enter Your Email'
                            className='border-2 border-black rounded-md md:w-96 w-[85vw] p-2 border-b-4 border-b-fuchsia-500 text-slate-800 outline-none'
                        />
                    </label>
                    <label className='relative'>
                        <p className='ml-2'>Password: </p>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            name='password'
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className='border-2 border-black rounded-md md:w-96 w-[85vw] p-2 border-b-4 border-b-fuchsia-500 text-slate-800 outline-none'
                        />
                        <span className='absolute right-5 translate-y-2 text-3xl text-black cursor-pointer' onClick={() => {
                            setShowPassword(!showPassword);
                        }}>
                            {!showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </label>
                    <label className='relative'>
                        <p className='ml-2'>Confirm Password: </p>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className='border-2 border-black rounded-md md:w-96 w-[85vw] p-2 border-b-4 border-b-fuchsia-500 text-slate-800 outline-none'
                        />
                        <span className='absolute right-5 translate-y-2 text-3xl text-black cursor-pointer' onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                        }}>
                            {!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </label>
                </div>
                <button type='submit' className="bg-yellow-400 text-black px-20 py-2 rounded-md mt-6 hover:scale-110 transition-all duration-300 font-medium">Submit</button>
            </form>
            <div className='md:inline-block flex justify-center items-center'>
                <img src={signUpImage} alt='signupImage' height={360} width={360} className="aspect-square md:h-[60vh] h-[40vh] md:w-[360px] w-[250px] shadow-lg shadow-fuchsia-500 dragNone" />
            </div>
        </div>
    )
}
