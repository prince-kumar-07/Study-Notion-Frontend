import { categories } from "../api";
import { showSpinner, hideSpinner } from "../../Reducer/Slices/SpinnerSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setAllCategory, setSeletedCategory, setDiffrentCategory } from "../../Reducer/Slices/Category";
// import { setToken } from "../../Reducer/Slices/AuthSlice";
// import { setUser } from "../../Reducer/Slices/ProfileSlice";
// import { IoMagnet } from "react-icons/io5";



const {
  SHOW_ALL_CATEGORIES_API,
  CREATE_CATEGORIES_API,
  GET_CATEGORY_PAGE_DATA,
  UPDATE_CATEGORY,
} = categories;

export async function getSeletedCategoryData(dispatch, categoryId, navigate) {

  dispatch(showSpinner("Creating category..."))
  try {
    const response = await apiConnector("GET",
      `${GET_CATEGORY_PAGE_DATA}?categoryId=${categoryId}`);

    dispatch(setSeletedCategory(response.data.categoryDetails))
    dispatch(setDiffrentCategory(response.data.differentCategoryCourses))
    navigate(`/category/${categoryId}`);

   } catch (error) {
     const message =
    error.response?.data?.message || "Something went wrong while fetching category";
    toast.error(message);
  }
   dispatch(hideSpinner())
}


export async function getAllCategory(dispatch) {
  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API, {});
    dispatch(setAllCategory(response.data.allCategories))
    // console.log(response.data.allCategories)

   } catch (error) {
     const message =
    error.response?.data?.message || "Something went wrong while fetching category";
    toast.error(message);
  }
}

export async function createCategory(dispatch, data) {

  dispatch(showSpinner("Creating category..."))
  const token = JSON.parse(localStorage.getItem("token"))
 
  try {
     await apiConnector("POST", CREATE_CATEGORIES_API, { ...data, token })

    toast.success("Category Created successfully")
    getAllCategory(dispatch)

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong while creating category");
  }
  dispatch(hideSpinner())
}

export async function getCategoryPageData(dispatch, categoryId) {

  dispatch(showSpinner("Creating Category Page Data..."))
  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API, {categoryId});
    // dispatch(setAllCategory(response.data.allCategories))

   } catch (error) {
     const message =
    error.response?.data?.message || "Something went wrong while fetching category Page Data";
    toast.error(message);
  }
   dispatch(hideSpinner())
}