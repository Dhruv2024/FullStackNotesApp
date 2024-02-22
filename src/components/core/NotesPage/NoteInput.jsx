import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotes } from '../../../services/operations/notesAPI';

export const NoteInput = ({ setTemp, temp, loading }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })
    function handleOnChange(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const { title, description } = formData;
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addNotes(title, description, token))
            .then(() => {
                setTemp(!temp);
            })
    }
    return (
        <div className='flex items-center justify-center mt-3'>
            <form onSubmit={handleSubmit} className='flex flex-col md:w-[35%] w-[80vw]'>
                <input
                    type='text'
                    required
                    name='title'
                    value={formData.title}
                    onChange={handleOnChange}
                    className='border-2 border-black mb-2 rounded-md h-10 pl-1 pt-[0.1rem]'
                    placeholder='Enter title'
                />
                <textarea
                    type='text'
                    required
                    name='description'
                    value={formData.description}
                    onChange={handleOnChange}
                    className='border-2 border-black resize-none mb-4 rounded-md pl-2 pt-2'
                    rows={"5"}
                    placeholder='Enter description'
                />
                {/* <input
                    type='text'
                    required
                    name='description'
                    value={formData.description}
                    onChange={handleOnChange}
                    className='border-2 border-black'
                /> */}
                {
                    !loading && (
                        <button type='submit' className='bg-yellow-300 py-2 rounded-lg border-b-6 border-b-yellow-200 shadow-sm shadow-yellow-300 transition-all duration-300 hover:bg-yellow-400 hover:shadow-md hover:shadow-red-400'>
                            Add Note
                        </button>
                    )
                }

            </form>
        </div>
    )
}
