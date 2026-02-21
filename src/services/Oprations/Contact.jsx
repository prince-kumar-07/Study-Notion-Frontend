import { showSpinner, hideSpinner } from "../../Reducer/Slices/SpinnerSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { contactEndPoints } from "../api";
import { setAllContactMessage } from "../../Reducer/Slices/ContactSlice";

const {
  CREAE_CONTACT_API,
  GET_ALLCONATCT_API,
  GET_OPEN_API,
  GET_CLOSE_CONTACT_API,
  UPDATE_CONTACT_STATUS_API,
  REPLY_CONTACT_API,
} = contactEndPoints;

export async function createContact(dispatch, data) {
  dispatch(showSpinner("Submitting Data..."));

  try {
    const response = await apiConnector("POST", CREAE_CONTACT_API, data);
    // if (!response?.data?.success) {
    //   throw new Error(response?.data?.message || "Failed to submit");
    // }
    toast.success("Data submitted successfully");
    return;
  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to submit data",
    );

    return null;
  } finally {
    dispatch(hideSpinner(null));
  }
}

export async function getAllContact(dispatch) {
  dispatch(showSpinner("Fetching Data..."));

  try {
    const response = await apiConnector("GET", GET_ALLCONATCT_API);
    dispatch(setAllContactMessage(response.data?.contacts));
    return;
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to submit data",
    );
    return;
  } finally {
    dispatch(hideSpinner(null));
  }
}

export async function updateContactStatus(dispatch, data) {
  dispatch(showSpinner("Updating Status..."));

  try {
    const response = await apiConnector("PUT", UPDATE_CONTACT_STATUS_API, data);

    toast.success("Status Updated successfully");
    getAllContact(dispatch);

    return;
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to Update data",
    );

    return null;
  } finally {
    dispatch(hideSpinner(null));
  }
}

export async function replyContact(dispatch, data) {
  dispatch(showSpinner("Updating Status..."));

  try {
    const response = await apiConnector("POST", REPLY_CONTACT_API, data);
    toast.success("Reply Updated successfully");
    getAllContact(dispatch);
    return;
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to Update data",
    );
    return;
  } finally {
    dispatch(hideSpinner(null));
  }
}