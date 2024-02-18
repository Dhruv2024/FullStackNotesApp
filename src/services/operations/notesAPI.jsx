import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { notesEndpoint } from "../apis"

const { GET_NOTE, ADD_NOTE, DELETE_NOTE, SINGLE_NOTE, UPDATE_NOTE } = notesEndpoint;
export function getAllNotes(token) {
    return async () => {
        try {
            const response = await apiConnector("GET", GET_NOTE, null,
                {
                    "Content-Type": "application/json",
                    Authorisation: `Bearer ${token}`,
                });
            console.log("RESPONSE OF GET_NOTE --> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // setNotes(response.data.notes)
            toast.success("Notes fetched successfully");
        }
        catch (err) {
            console.log("GET NOTE ERROR............", err)
            toast.error("Could Not Fetch Notes")
        }
    }
}

export function addNotes(title, description, token) {
    return async () => {
        try {
            const response = await apiConnector("POST", ADD_NOTE, {
                title,
                description,
                token
            });
            console.log("RESPONSE OF ADD_NOTE --> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // setNotes(response.data.notes)
            toast.success("Note added successfully");
        }
        catch (err) {
            console.log("ADD NOTE ERROR............", err)
            toast.error("Could Not Add Notes")
        }
    }
}

export function deleteNote(noteId, token) {
    return async () => {
        try {
            const response = await apiConnector("POST", DELETE_NOTE, {
                noteId,
                token
            });
            console.log("RESPONSE OF DELETE NOTE --> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Note Deleted successfully");
        }
        catch (err) {
            console.log("DELETE NOTE ERROR............", err);
            toast.error("Could not Delete Notes");
        }
    }
}

export function fetchSingleNote(noteId, token) {
    return async () => {
        try {
            const response = await apiConnector("POST", SINGLE_NOTE, {
                noteId,
            },
                {
                    "Content-Type": "application/json",
                    Authorisation: `Bearer ${token}`,
                }
            );
            console.log("RESPONSE OF FETCH_SINGLE_NOTE --> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // setNotes(response.data.notes)
            toast.success("Note fetched successfully");
            return response.data.note;
        }
        catch (err) {
            console.log("FETCH SINGLE NOTE ERROR............", err)
            toast.error("Could Not Fetch Note")
        }
    }
}

export function updateNote(noteId, title, description, token) {
    return async () => {
        try {
            const response = await apiConnector("POST", UPDATE_NOTE, {
                noteId,
                title,
                description
            },
                {
                    "Content-Type": "application/json",
                    Authorisation: `Bearer ${token}`,
                }
            )
            console.log("RESPONSE OF UPDATE NOTE --> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // setNotes(response.data.notes)
            toast.success("Note updated successfully");
        }
        catch (err) {
            console.log("FETCH UPDATE NOTE ERROR............", err)
            toast.error("Could Not Update Note")
        }
    }
}