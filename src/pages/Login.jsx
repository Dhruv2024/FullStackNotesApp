import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';
import loginImage from '../assets/images/LoginImage.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    function handleOnChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const { email, password } = formData;
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    }
    return (
        <div className='flex items-center justify-center gap-20 h-[89vh] bg-slate-900 text-slate-300 md:flex-row-reverse flex-col-reverse md:pt-0 pt-2'>
            <form onSubmit={handleSubmit} className='md:h-[80vh] flex flex-col justify-center items-center gap-4'>
                <div className='flex flex-col gap-3'>
                    <label>
                        <p className='ml-1'>Email Address:</p>
                        <input
                            required
                            type='email'
                            value={formData.email}
                            onChange={handleOnChange}
                            name='email'
                            placeholder='Enter Your Email'
                            className='outline-none border-2 border-black rounded-md md:w-96 w-[85vw] p-2 border-b-4 border-b-cyan-400 text-slate-800'
                        />
                    </label>
                    <label className='relative'>
                        <p className='ml-1'>Password:</p>
                        <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleOnChange}
                            name='password'
                            placeholder='Enter Password'
                            className='outline-none border-2 border-black rounded-md md:w-96 w-[85vw] p-2 border-b-4 border-b-cyan-400 text-slate-800'
                        />
                        <span className='absolute right-5 translate-y-2 text-3xl text-black cursor-pointer' onClick={() => {
                            setShowPassword(!showPassword);
                        }}>
                            {!showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </label>
                </div>
                <button type='submit' className="bg-yellow-400 text-black px-20 py-2 rounded-md mt-6 hover:scale-110 transition-all duration-300 font-medium">Login</button>
            </form>
            <div>
                <img src={loginImage} alt='Login Image' height={360} width={360} className="aspect-square md:h-[60vh] h-[40vh] md:w-[360px] w-[290px] shadow-lg shadow-cyan-400 dragNone" />
            </div>
        </div>
    )
}
