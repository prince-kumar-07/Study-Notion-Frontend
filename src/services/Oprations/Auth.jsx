import { authEndPoints, settingsEndpoints } from "../api";
import { showSpinner, hideSpinner } from "../../Reducer/Slices/SpinnerSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setShowOTP, setSuccess, setSubmmited, setPasswordResetSuccess} from "../../Reducer/Slices/SignUpSlice";
import { setToken } from "../../Reducer/Slices/AuthSlice";
import { setUser } from "../../Reducer/Slices/Profileslice";
// import { useNavigate } from "react-router-dom";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = authEndPoints;

// const navigate = useNavigate()

const {
  DELETE_PROFILE_API,
  CHANGE_PASSWORD_API
} = settingsEndpoints

export async function sendOTP(email, dispatch, navigate) {
  dispatch(showSpinner("Requesting OTP..."));

  try {
    await apiConnector("POST", SENDOTP_API, {
      email,
      checkUserPresent: true,
    });

    toast.success("OTP sent successfully");
    dispatch(setShowOTP());

  } catch (error) {
     const message =
    error.response?.data?.message || "Something went wrong";
    toast.error(message);
  }

  dispatch(hideSpinner());
}


export async function signUP(dispatch, formData, otp) {
  dispatch(showSpinner("Validating OTP..."));


  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      ...formData,
      otp,
    });

    // console.log(response)

    toast.success("Account Created Successfully");
    dispatch(setSuccess());
    // navigate("/login")

  } catch (error) {
    const message =
    error.response?.data?.message || "Something went wrong";
    toast.error(message);

  }

  dispatch(hideSpinner());
}



export async function forgotPassword(dispatch, email) {
  dispatch(showSpinner("Generating password reset link..."));

  try {
    const response = await apiConnector("POST", RESETPASSTOKEN_API, {
      email,
    });

    console.log(response)

    dispatch(setSubmmited());
    toast.success("Password reset link sent successfully.");

  } catch (error) {
    const message =
    error.response?.data?.message || "Something went wrong";
    toast.error(message);
    console.log(error);
  }

  dispatch(hideSpinner());
}




export async function login(dispatch, formData, navigate) {
  dispatch(showSpinner("Validating credentials..."));

  

  try {
    const response = await apiConnector("POST", LOGIN_API, {
      ...formData,  
    });



    dispatch(setToken(response.data?.token))
    dispatch(setUser({ ...response.data.user}))
    localStorage.setItem("token", JSON.stringify(response.data.token))
    localStorage.setItem("user", JSON.stringify(response.data.user))
    
    toast.success("Logged in successfully.");
    navigate("/");


  } catch (error) {
     const message =
    error.response?.data?.message || "Something went wrong";
    toast.error(message);
    console.log(error);
  }

  dispatch(hideSpinner());
}



export async function PasswordChangeService(dispatch, formData) {

  dispatch(showSpinner("Upadting password..."));

  console.log({...formData})

  try {
    const response = await apiConnector("POST", RESETPASSWORD_API, {
      ...formData,  
    });

    dispatch(setPasswordResetSuccess())
    toast.success("password chnanged successfully.");

  } catch (error) {
    const message =
    error.response?.data?.message || "Something went wrong";
    toast.error(message);
    console.log(error);
  }

  dispatch(hideSpinner());
}

export function logout(dispatch) {
  
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
  
}


export async function deleteAccount(dispatch) {
  dispatch(showSpinner("Deleting... Acount"));

  console.log("delting account")
  const email = JSON.parse(localStorage.getItem("user")).email
  
  if(!email)
    return

  try {
    const response = await apiConnector("DELETE", DELETE_PROFILE_API, {
      email:email,  
    });

    logout(dispatch)

    toast.success("Deletion successfull");
    // navigate("/")

  } catch (error) {
     const message =
    error.response?.data?.message || "Something went wrong";
    toast.error(message);
    console.log(error);
  }

  dispatch(hideSpinner());
}


export async function PasswordUpdateService(dispatch, formData) {

  dispatch(showSpinner("Upadting password..."));

  const { currentPassword, newPassword, confirmNewPassword } = formData;
  const token = JSON.parse(localStorage.getItem("token"))



  console.log({...formData})

  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, {
      currentPassword,
      newPassword,
      confirmNewPassword,
      token  
    });

    dispatch(setPasswordResetSuccess())
    toast.success("password chnanged successfully.");
    logout(dispatch)

  } catch (error) {
    const message =
    error.response?.data?.message || "Something went wrong";
    toast.error(message);
    console.log(error);
  }

  dispatch(hideSpinner());
}