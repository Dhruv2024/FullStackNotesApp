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
        <div className="bg-black flex items-center justify-center mx-auto pt-7 w-[100%] pb-6">
            <div className="w-[80%] flex gap-5 justify-center">
                <div className="text-white w-[50%] h-[400px] flex flex-col items-center justify-center">
                    <div className="font-semibold text-5xl mb-6 overflow-y-hidden text-white w-[95%]">Welcome To <span className='text-yellow-400'>NoteSync</span>
                    </div>
                    <p className="richBlack">
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
                <img src={HomeImage} className="aspect-square h-[500px] shadow-lg shadow-yellow-200" />
            </div>
        </div>
    )
}
