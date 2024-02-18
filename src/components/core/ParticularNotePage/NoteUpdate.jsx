import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchSingleNote, updateNote } from '../../../services/operations/notesAPI';
import { useDispatch, useSelector } from 'react-redux';

export const NoteUpdate = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [notesDetail, setNotesDetail] = useState({
        title: "",
        description: ""
    });
    const { token } = useSelector((state) => state.auth);

    async function getNotesDetails() {
        const temp = location.pathname.split("/");
        const noteId = temp[temp.length - 1];
        // console.log(noteId);
        const result = await dispatch(fetchSingleNote(noteId, token))
        setNotesDetail(result);
        setLoading(false);
    }
    useEffect(() => {
        getNotesDetails();
    }, [])
    // console.log(notesDetail);
    useEffect(() => {
        setFormData({
            title: notesDetail.title,
            description: notesDetail.description
        })
    }, [notesDetail])

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })

    function handleChange(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)
        const temp = location.pathname.split("/");
        const noteId = temp[temp.length - 1];
        const { title, description } = formData;
        dispatch(updateNote(noteId, title, description, token));
        navigate("/dashboard/my-notes")
    }
    return (
        <div className='bg-slate-800'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className='w-[98vw] flex justify-center'>
                        <form onSubmit={handleSubmit} className='flex flex-col justify-between'>
                            <div className='mt-5'>
                                {/* title */}
                                <input
                                    type='text'
                                    value={formData.title}
                                    name='title'
                                    onChange={handleChange}
                                    required
                                    className='w-[80%] h-[10vh] outline-none pl-3 border-2 rounded-md'
                                />
                                {/* {notesDetail.title} */}
                                {/* button */}
                                <button type='submit' className='bg-yellow-300 py-2 px-2 rounded-lg hover:bg-yellow-400 ml-4'>Save Changes</button>
                            </div>
                            <div className='pb-4'>
                                {/* description */}
                                <textarea
                                    type='text'
                                    value={formData.description}
                                    name='description'
                                    onChange={handleChange}
                                    cols={140}
                                    rows={18}
                                    className='resize-y mt-4 outline-none border-2 pl-3 rounded-md'
                                    required
                                />
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
