import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../services/operations/authAPI';
import { setSignupData } from '../slices/authSlice';
import toast from 'react-hot-toast';
import signUpImage from '../assets/images/SignupImage.png'
export const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

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

            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center md:h-[80vh] gap-4'>
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
                            className='border-2 border-black rounded-md w-96 p-2 border-b-4 border-b-fuchsia-500 text-slate-800'
                        />
                    </label>
                    <label>
                        <p className='ml-2'>Email: </p>
                        <input
                            type='text'
                            required
                            name='email'
                            value={formData.email}
                            onChange={handleOnChange}
                            placeholder='Enter Your Email'
                            className='border-2 border-black rounded-md w-96 p-2 border-b-4 border-b-fuchsia-500 text-slate-800'
                        />
                    </label>
                    <label>
                        <p className='ml-2'>Password: </p>
                        <input
                            type='text'
                            required
                            name='password'
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className='border-2 border-black rounded-md w-96 p-2 border-b-4 border-b-fuchsia-500 text-slate-800'
                        />
                    </label>
                    <label>
                        <p className='ml-2'>Confirm Password: </p>
                        <input
                            type='text'
                            required
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className='border-2 border-black rounded-md w-96 p-2 border-b-4 border-b-fuchsia-500 text-slate-800'
                        />
                    </label>
                </div>
                <button type='submit' className="bg-yellow-400 text-black px-20 py-2 rounded-md mt-6 hover:scale-110 transition-all duration-300 font-medium">Submit</button>
            </form>
            <div>
                <img src={signUpImage} alt='signupImage' height={360} width={360} className="aspect-square h-[60vh] shadow-lg shadow-fuchsia-500 dragNone" />
            </div>
        </div>
    )
}
