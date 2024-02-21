//**important
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL
// console.log(BASE_URL)
// const BASE_URL = "http://localhost:4000/api/v1"
//auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/user/verify-email",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
}

export const notesEndpoint = {
    ADD_NOTE: BASE_URL + "/notes/createNote",
    UPDATE_NOTE: BASE_URL + "/notes/updateNote",
    DELETE_NOTE: BASE_URL + "/notes/deleteNote",
    GET_NOTE: BASE_URL + "/notes/getNotes",
    SINGLE_NOTE: BASE_URL + "/notes/getSingleNote",
}