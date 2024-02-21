import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import HomeImage from "../assets/images/homeImage.png"

export const Home = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    // useEffect(() => {
    //     if (token) {
    //         navigate("/dashboard/my-notes");
    //     }
    // }, [])
    return (
        // <div className='flex flex-col'>
        //     <button onClick={() => {
        //         navigate("/signup")
        //     }}>
        //         SignUp
        //     </button>
        //     <button onClick={() => {
        //         navigate("/login");
        //     }}>
        //         Login
        //     </button>
        // </div>
        <div className="bg-black flex items-center md:justify-center mx-auto pt-7 w-[100%] pb-6 ">
            <div className="w-[80%] flex md:gap-5 gap-1 md:justify-center md:flex-row flex-col-reverse justify-start">
                <div className="text-white md:w-[50%] w-[100vw] h-[400px] flex flex-col items-center justify-center">
                    <div className="font-semibold text-5xl mb-6 overflow-y-hidden text-white w-[95%] md:text-start text-center">Welcome To <span className='text-yellow-400'>NoteSync</span>
                    </div>
                    <p className="richBlack md:w-[100%] w-[85%]">
                        {/* content */}
                        Streamline your note-taking with simple creation, updating, and deletion features. Keep your notes organized and accessible across all devices with ease.
                    </p>
                    <button onClick={() => {
                        if (token) {
                            navigate("/dashboard/my-notes")
                        }
                        else {
                            navigate("/login")
                        }
                    }}
                        className="bg-yellow-400 text-black px-3 py-2 rounded-md mt-6 hover:scale-110 transition-all duration-300 font-medium"
                    >Explore More</button>
                </div>
                {/* image */}
                <div className='md:block flex items-center justify-center md:w-fit w-[100vw]'>
                    <img src={HomeImage} className="aspect-square md:h-[500px] h-[350px] shadow-lg shadow-yellow-200" />
                </div>
            </div>
        </div>
    )
}
