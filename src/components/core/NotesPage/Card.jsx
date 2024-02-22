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
    let desp1 = note.description;
    let desp = "";
    let prev = 0;
    if (desp1.length > 45) {
        for (let i = 0; i < 300; i++) {
            let slice = desp1.substr(prev, 45);
            if (i % 45 === 0) {
                prev = i + 2;
                desp += '\n';
                desp += slice;
            }
        }
        desp = desp.substr(0, 350) + "..."
    }
    else {
        desp = desp1;
    }

    return (
        <div onClick={handleClick}>
            <div className='relative group flex flex-col shadow-box md:w-[30vw] w-[90vw] md:h-[35vh] h-[25vh] rounded-lg transition-all duration-300'>
                <MdDelete className='absolute left-0 bottom-0 text-white topRightBorder bg-red-600 text-4xl md:hidden cursor-pointer
                p-2 group-hover:opacity-100 group-hover:block'
                    id='deleteIcon'
                    onClick={() => deleteThatNote()}
                />
                <h1 className='flex justify-center border-b-4 font-bold text-2xl'>{note.title}</h1>
                <p>{desp}</p>
            </div>
        </div>
    )
}

