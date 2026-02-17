import { showSpinner, hideSpinner } from "../../Reducer/Slices/SpinnerSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setUser } from "../../Reducer/Slices/Profileslice";
import { settingsEndpoints } from "../api";
import usePageTitle from "./Title/Title";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export async function UpdateProfileImage(dispatch, file) {
  if (!file) {
    toast.error("Please select an image first");
    return;
  }

  dispatch(showSpinner("Updating Profile Picture..."));

  const token = localStorage.getItem("token");
//   console.log("token ")

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



