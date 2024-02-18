import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../../services/operations/notesAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Card = ({ note, setTemp, temp }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    function deleteThatNote(e) {
        dispatch(deleteNote(note._id, token))
            .then(() => {
                setTemp(!temp)
            })
    }
    function handleClick(e) {
        if (e.target.id !== 'deleteIcon') {
            navigate(`/dashboard/notes/${note._id}`)
        }
    }
    return (
        <div onClick={handleClick}>
            <div className='relative group flex flex-col shadow-box w-[30vw] lg:h-[35vh] rounded-lg transition-all duration-300'>
                <MdDelete className='absolute left-0 bottom-0 text-white topRightBorder bg-red-600 text-4xl hidden cursor-pointer
                p-2 group-hover:opacity-100 group-hover:block'
                    id='deleteIcon'
                    onClick={() => deleteThatNote()}
                />
                <h1 className='flex justify-center border-b-4 font-bold text-2xl'>{note.title}</h1>
                <p>{note.description}</p>
            </div>
        </div>
    )
}
