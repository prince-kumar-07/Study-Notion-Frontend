import { showSpinner, hideSpinner } from "../../Reducer/Slices/SpinnerSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { courseEndpoints } from "../api";
import { setAllCourses } from "../../Reducer/Slices/CourseSlice";

const {
  CREATE_COURSE_API,
  GET_ALL_COURSE_API,
  DELETE_COURSE_API,
  UPDATE_COURSE_API,
  GET_CREATED_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  CREATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  ENTIRE_COURSE_API

} = courseEndpoints

export async function addNewCourse(dispatch, data, naviagte) {
  dispatch(showSpinner("Creating Course..."));

   const token = JSON.parse(localStorage.getItem("token"))

   try {
    const response = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      data,
      token,
      // {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      // }
    );
    toast.success("Course Created Sucessfully")
    naviagte("/dashboard/my-courses")
    // console.log(response);
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload failed");
    console.log(error)
  }

  dispatch(hideSpinner());
}

export async function fetchCreatedCourse(dispatch){

   dispatch(showSpinner("Fetching all Courses..."));
   const token = JSON.parse(localStorage.getItem("token"))
  //  console.log(id)

    //  console.log(user)

   try {
    const response = await apiConnector(
      "GET",
       GET_CREATED_COURSE_API,
      token,
      // {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      // }
    );
    // console.log(response.data.data)
    // toast.success("All Courses Fetched Sucessfully")
    dispatch(setAllCourses(response.data.data));

  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while getting all coures");
    console.log(error)
  }

  dispatch(hideSpinner());
}

export async function updateEditedCourse(dispatch, formdata){

   dispatch(showSpinner("Updating Course..."));
   const token = JSON.parse(localStorage.getItem("token"))

  //  console.log(formdata)

   try {
    const response = await apiConnector(
      "PUT",
       UPDATE_COURSE_API,
      formdata,
      token,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    fetchCreatedCourse(dispatch);
    // console.log(response.data.data)
    toast.success("Course Updated Sucessfully")
    

  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while updating course");
    console.log(error)
  }

  dispatch(hideSpinner());
}

export async function deleteCourse(dispatch, _id){

    console.log(_id)
  

   dispatch(showSpinner("Deleting Course..."));
   const token = JSON.parse(localStorage.getItem("token"))

   try {
    const response = await apiConnector(
      "DELETE",
      DELETE_COURSE_API,
      { courseId: _id },
      token,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    // console.log(response.data.data)
    toast.success("Course deleted Sucessfully")
   fetchCreatedCourse(dispatch);

  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while deleting course");
    console.log(error)
  }

  dispatch(hideSpinner());

}

export async function addSection(dispatch, formData){

   dispatch(showSpinner("Adding Section..."));
   const token = JSON.parse(localStorage.getItem("token"))

   try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      formData,
      token,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    toast.success("Added Section Sucessfully")
   fetchCreatedCourse(dispatch);
    //  console.log(response.data.data)
  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while Adding Section");
    console.log(error)
  }

  dispatch(hideSpinner());

}

export async function updateSection(dispatch, formData){

   dispatch(showSpinner("Updating Section.."));
   const token = JSON.parse(localStorage.getItem("token"))

   try {
    const response = await apiConnector(
      "PUT",
      UPDATE_SECTION_API,
      formData,
      token,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    toast.success("Updated Section Successfully")
   fetchCreatedCourse(dispatch);

  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while updating section");
    console.log(error)
  }

  dispatch(hideSpinner());
}


export async function deleteSection(dispatch, sectionId){

   dispatch(showSpinner("Deleting Section.."));
   const token = JSON.parse(localStorage.getItem("token"))

   try {
    const response = await apiConnector(
      "DELETE",
      DELETE_SECTION_API,
      {sectionId},
      token,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    toast.success("Section Deleted Successfully")
   fetchCreatedCourse(dispatch);

  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while deleting section");
    console.log(error)
  }
  dispatch(hideSpinner());
}


export async function addSubSection(dispatch, formData){

   dispatch(showSpinner("Adding SubSection.."));
   const token = JSON.parse(localStorage.getItem("token"))

   try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      formData,
      token,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    toast.success("Added SubSection Successfully")
   fetchCreatedCourse(dispatch);

  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while creating sub-section");
    console.log(error)
  }
  dispatch(hideSpinner());
}

export async function updateSubSection(dispatch, formData){

   dispatch(showSpinner("Updating SubSection.."));
   const token = JSON.parse(localStorage.getItem("token"))

   try {
    const response = await apiConnector(
      "PUT",
      UPDATE_SUBSECTION_API,
      formData,
      token,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    toast.success("Updated SubSection Successfully")
   fetchCreatedCourse(dispatch);

  } catch (error) {

    toast.error(error.response?.data?.message || "Some thing went wrong while updating sub-section");
    console.log(error)
  }
  dispatch(hideSpinner());
}


export async function deleteSubSection(dispatch, formData){

  const data = Object.fromEntries(formData.entries());

  // console.log("Sending:", data);

  dispatch(showSpinner("Deleting Sub-Section.."));

  const token = JSON.parse(localStorage.getItem("token"))

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_SUBSECTION_API,
      data,   // ✅ send JSON instead of FormData
      token,
      // {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "application/json",
      // }
    );

    toast.success("Sub-Section Deleted Successfully");

    fetchCreatedCourse(dispatch);

  } catch (error) {
    console.log(error);
  }

  dispatch(hideSpinner());
}

export async function fetchEntireCourses(dispatch){

   dispatch(showSpinner("Fetching all Courses..."));
   const token = JSON.parse(localStorage.getItem("token"))
  //  console.log(id)

    //  console.log(user)

   try {
    const response = await apiConnector(
      "GET",
       ENTIRE_COURSE_API,
       {},
      token,
      // {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      // }
    );
    // console.log(response.data.data)
    // toast.success("All Courses Fetched Sucessfully")
    dispatch(setAllCourses(response.data.data));

  } catch (error) {
    toast.error(error.response?.data?.message || "Some thing went wrong while getting all coures");
    console.log(error)
  }

  dispatch(hideSpinner());
}

