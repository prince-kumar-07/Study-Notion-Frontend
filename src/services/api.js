const BASE_URL = import.meta.env.VITE_BASE_URL

export const categories = {
    SHOW_ALL_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_CATEGORIES_API: BASE_URL + "/course/createCategory",
    GET_CATEGORY_PAGE_DATA: BASE_URL + "/course/getCategoryPageDetails",
    UPDATE_CATEGORY: BASE_URL + "/course/updateCategory",
}


export const authEndPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    POST_LOGIN_HANDLER_API: BASE_URL + "/auth/postLoginHandler",
}


export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
}


export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PYMENT_SUCCESS_EMAIL: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const courseEndpoints = {
  GET_CREATED_COURSE_API: BASE_URL + "/course/created-courses",
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  UPDATE_COURSE_API: BASE_URL + "/course/updateCourse",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  ENTIRE_COURSE_API: BASE_URL + "/course/entireCourse",
  GET_ALL_COURSES_API: BASE_URL + "/course/getAllCourses",
  GET_ENROLLED_COURSE_API: BASE_URL + "/course/getEnrolledCourses",
  GET_ENROLLED_COURSE_DETAILS_API: BASE_URL + "/course/getEnrolledCourseDetails"

}


export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const paymentEndpoint = {
  CAPTURE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  VERIFY_PAYMENT_API: BASE_URL + "/payment/verifyPayment",
  SEND_PYMENT_SUCCESS_EMAIL: BASE_URL + "/payment/sendPaymentSuccessEmail",
  SEND_PYMENT_FAIL_EMAIL: BASE_URL + "/payment/sendPaymentFailEmail",
  GET_ALL_INVOICES: BASE_URL + "/payment/getAllInvoices",
};


export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  CANCEL_DELETE_PROFILE_API: BASE_URL + "/profile/cancelDeleteProfile",
  GET_ALL_INSTRUCTOR_API: BASE_URL + "/profile/getAllInstructor",
  GET_ALL_USER_API: BASE_URL + "/profile/getAllUserDetails",
  UPDATE_USER_STATUS_API: BASE_URL + "/profile/updateUserBlockStatus",
  UPDATE_USER_ACCOUNT_TYPE_API: BASE_URL + "/profile/updateUserAccountType",
  GET_ALL_PENDING_INSTRUCTOR: BASE_URL + "/profile/getAllPendingApprovalAndRejectedInstructor",
  UPDATE_INSTRUCTOR_STATUS: BASE_URL + "/profile/updateInstructorApproval",

}


export const contactEndPoints = {
    CREAE_CONTACT_API: BASE_URL + "/contact/createContact",
    GET_ALLCONATCT_API: BASE_URL + "/contact/getAllContacts",
    GET_OPEN_API: BASE_URL + "/contact/getOpenContacts",
    GET_CLOSE_CONTACT_API: BASE_URL + "/contact/getClosedContacts",
    UPDATE_CONTACT_STATUS_API: BASE_URL + "/contact/updateContactStatus",
    REPLY_CONTACT_API: BASE_URL + "/contact/replyContact",
}