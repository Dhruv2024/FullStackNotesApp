import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';
import loginImage from '../assets/images/LoginImage.png'

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
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
                            className='border-2 border-black rounded-md w-96 p-2 border-b-4 border-b-cyan-400 text-slate-800'
                        />
                    </label>
                    <label>
                        <p className='ml-1'>Password:</p>
                        <input
                            required
                            type='text'
                            value={formData.password}
                            onChange={handleOnChange}
                            name='password'
                            placeholder='Enter Password'
                            className='border-2 border-black rounded-md w-96 p-2 border-b-4 border-b-cyan-400 text-slate-800'
                        />
                    </label>
                </div>
                <button type='submit' className="bg-yellow-400 text-black px-20 py-2 rounded-md mt-6 hover:scale-110 transition-all duration-300 font-medium">Login</button>
            </form>
            <div>
                <img src={loginImage} alt='Login Image' height={360} width={360} className="aspect-square md:h-[55vh] h-[40vh] shadow-lg shadow-cyan-400 dragNone" />
            </div>
        </div>
    )
}
