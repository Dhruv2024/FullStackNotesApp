import toast from "react-hot-toast"
import { setLoading, setToken } from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice';
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";


const { SENDOTP_API, SIGNUP_API, LOGIN_API } = endpoints
export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
            })
            console.log("Response of SENDOTP_API=> ", response);
            console.log(response.data.success);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("OTP Sent Successfully");
            navigate("/verify-email")
        }
        catch (err) {
            console.log("SENDOTP API ERROR............", err)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signup(
    name,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                name,
                email,
                password,
                confirmPassword,
                otp
            });
            console.log("Resposne of SIGNUP_API=> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        }
        catch (err) {
            console.log("SIGNUP API ERROR............", err)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(
    email,
    password,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })

            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));

            dispatch(setUser({ ...response.data.user }));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-notes")
        }
        catch (err) {
            console.log("LOGIN API ERROR............", err)
            // toast.error("Login Failed")
            toast.error(err.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function Logout(navigate, flag) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (flag) {
            toast.error("Session Expired");
            navigate("/login")
        }
        else {
            toast.success("Logged out Successfullly");
            navigate("/");
        }
    }
}