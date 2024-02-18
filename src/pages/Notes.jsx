import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { notesEndpoint } from '../services/apis';
import toast from 'react-hot-toast';
import { NoteInput } from '../components/core/NotesPage/NoteInput';
import { Card } from '../components/core/NotesPage/Card';
import { Logout } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

export const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [temp, setTemp] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { GET_NOTE } = notesEndpoint;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function getNotes() {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_NOTE, null,
                {
                    "Content-Type": "multipart/form-data",
                    Authorisation: `Bearer ${token}`,
                });
            console.log("RESPONSE OF GET_NOTE --> ", response);

            setNotes(response.data.notes)
            // toast.success("Notes fetched successfully");
        }
        catch (err) {
            console.log("GET NOTE ERROR............", err)
            if (err.response.data?.tokenExpire) {
                dispatch(Logout(navigate, true));
                return;
            }
            toast.error("Could Not Fetch Notes")
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }
    useEffect(() => {
        // console.log(token);
        // dispatch(getAllNotes(setNotes, token));
        // console.log("notes fetched...", notes)
        getNotes();
    }, [temp])

    return (
        <div className='flex flex-col'>
            <NoteInput setTemp={setTemp} temp={temp} loading={loading} />
            {
                loading ? (
                    <div className='flex items-center justify-center'>
                        <div className='spinner'></div>
                    </div>
                ) : (
                    <div>
                        <div className='flex gap-5 justify-center flex-wrap mt-5'>
                            {
                                notes.map((note) => (
                                    <Card note={note} setTemp={setTemp} temp={temp} key={note._id} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
