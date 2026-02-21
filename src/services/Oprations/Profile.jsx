import { showSpinner, hideSpinner } from "../../Reducer/Slices/SpinnerSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setUser, setAllUsers, setPendingInstructor } from "../../Reducer/Slices/ProfileSlice";
import { settingsEndpoints } from "../api";


const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  // GET_ALL_INSTRUCTOR_API,
  GET_ALL_USER_API,
  UPDATE_USER_STATUS_API,
  UPDATE_USER_ACCOUNT_TYPE_API,
  GET_ALL_PENDING_INSTRUCTOR,
  UPDATE_INSTRUCTOR_STATUS
} = settingsEndpoints

export async function UpdateProfileImage(dispatch, file) {
  if (!file) {
    toast.error("Please select an image first");
    return;
  }

  dispatch(showSpinner("Updating Profile Picture..."));

  const token = localStorage.getItem("token");


  try {
    const formData = new FormData();
    formData.append("displayPicture", file);

    const response = await apiConnector(
      "PUT",
      UPDATE_DISPLAY_PICTURE_API,
      formData,
      token,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const updatedUser = response.data.data;
    // console.log(response)
    
    dispatch(setUser(updatedUser));

    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile image updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload failed");
  }

  dispatch(hideSpinner());
}

export async function UpdateProfileInfo(dispatch, additionalData) {

  dispatch(showSpinner("Updating Profile ..."));
  const token = localStorage.getItem("token");

  try {

    const response = await apiConnector(
      "PUT", UPDATE_PROFILE_API,
      {
        ...additionalData,
        token
      },
      {
        Authorization: `Bearer ${token}`,
      }
      
    );
    const updatedUser = response.data.data;
    
    dispatch(setUser(updatedUser));

    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile data updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload failed");
  }

  dispatch(hideSpinner());
}

// export async function fetchAllInstructor(dispatch) {

//   dispatch(showSpinner("Fetching All Users ..."));
//   const token = localStorage.getItem("token");

//   try {

//     const response = await apiConnector(
//       "GET", 
//       GET_ALL_INSTRUCTOR_API,
//       {
//         token
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
      
//     );
//     console.log(response)
//     // const updatedUser = response.data.data;
    
//     // dispatch(setUser(updatedUser));

//     // localStorage.setItem("user", JSON.stringify(updatedUser));

//     toast.success("All Users Fetched successfully");
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Upload failed");
//   }

//   dispatch(hideSpinner());
// }

export async function fetchAllUser(dispatch) {
  dispatch(showSpinner("Fetching All Users ..."));
  const token = localStorage.getItem("token");

  try {
    const response = await apiConnector("GET", GET_ALL_USER_API, {
      token,
    });
    dispatch(setAllUsers(response.data.data));
  } catch (error) {
    toast.error(error.response?.data?.message || "Fetch all user failed");
  }
  dispatch(hideSpinner());
}

export async function updateUserBlockStatus(dispatch, data) {
  dispatch(showSpinner("Updating User Status..."));
  const token = localStorage.getItem("token");

  try {
    const response = await apiConnector("POST", UPDATE_USER_STATUS_API, {
      ...data,
      token,
    });
     fetchAllUser(dispatch)
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update user Status");
  }
  dispatch(hideSpinner());
}


export async function promoteToAdmin(dispatch, data) {
  dispatch(showSpinner("Updating User Status..."));
  const token = localStorage.getItem("token");

  try {
    const response = await apiConnector("POST", UPDATE_USER_ACCOUNT_TYPE_API, {
      ...data,
      token,
    });
    fetchAllUser(dispatch)
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update user Status");
  }
  dispatch(hideSpinner());
}

export async function fetchPendingInstructorAllUser(dispatch) {
  dispatch(showSpinner("Fetching All Users ..."));
  const token = localStorage.getItem("token");

  try {
    const response = await apiConnector("GET", GET_ALL_PENDING_INSTRUCTOR, {
      token,
    });
    console.log(response)
    dispatch(setPendingInstructor(response.data.data));
  } catch (error) {
    toast.error(error.response?.data?.message || "Fetch all user failed");
  }
  dispatch(hideSpinner());
}

export async function updateInstuctorStatus(dispatch, data) {
  dispatch(showSpinner("Updating User Status..."));
  const token = localStorage.getItem("token");

  try {
    const response = await apiConnector("POST", UPDATE_INSTRUCTOR_STATUS, {
      ...data,
      token,
    });
    dispatch(setAllUsers(response.data.data));
    fetchPendingInstructorAllUser(dispatch)
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to updated user");
  }
  dispatch(hideSpinner());
}


