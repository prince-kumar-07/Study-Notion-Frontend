import { paymentEndpoint } from "../api";
import { showSpinner, hideSpinner } from "../../Reducer/Slices/SpinnerSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { resetCart } from "../../Reducer/Slices/CartSlice"
import { setAllInvoices } from "../../Reducer/Slices/CourseSlice"


const {
  CAPTURE_PAYMENT_API,
  VERIFY_PAYMENT_API,
  SEND_PYMENT_SUCCESS_EMAIL,
  SEND_PYMENT_FAIL_EMAIL,
  GET_ALL_INVOICES
} = paymentEndpoint;

export async function getAllInvoices(dispatch) {

  const token = JSON.parse(localStorage.getItem("token"));
  dispatch(showSpinner("Fetching All Invoices ..."));

  try {

    const response = await apiConnector(
      "GET",
      GET_ALL_INVOICES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    dispatch(setAllInvoices(response.data.invoices))
    console.log(response.data.invoices)

  } catch (error) {

    const message =
      error.response?.data?.message ||
      "Something went wrong while fetching all invoices";

    toast.error(message);

  } finally {

    dispatch(hideSpinner());

  }
}


function loadScript(src){

  return new Promise((resolve) => {
    const script =  document.createElement("script")
    script.src = src

    script.onload = () => {
      resolve(true)
    }

    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script) 
  }) 
}

export async function buyCourse(courses, userDetails, navigate, dispatch) {
  // console.log(courses, userDetails)
  const token = JSON.parse(localStorage.getItem("token"));
  const toastId = toast.loading("Loading...");

  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      CAPTURE_PAYMENT_API,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log(orderResponse);
    if (!orderResponse.data.success) {
      toast.error(orderResponse.data.message)
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: `${orderResponse.data.message.id}`,
      name: "Study Notion",
      description: "Thank you for Purchasing the Course",
      image: "",
      prefill: {
        name: `${userDetails.firstName}`,
        email: `${userDetails.email}`,
      },

      handler: function (response) {
        sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);

        verifyPayment(dispatch, navigate, { ...response, courses });
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      console.log("Payment Failed Response:", response);

      toast.error("Payment Failed");

      const descrption = response.error.description;
      const paymentId = response.error.metadata.payment_id;
      const orderId = response.error.metadata.order_id;
      const amount = orderResponse.data.message.amount;

      sendPaymentFailEmail(descrption, paymentId, orderId, amount, token);
    });
  } catch (error) {
    console.log("Payment api error ", error);
    // toast.error(
    //   error.response?.data?.message ||
    //     "Some thing went wrong while fetching Enrolled course",
    // );
  }
  toast.dismiss(toastId);
}


export async function verifyPayment(dispatch, navigate, bodydata) {

  const token = JSON.parse(localStorage.getItem("token"))
  dispatch(showSpinner("Verfying payment..."))

  try {
    const response = await apiConnector(
      "POST",
      VERIFY_PAYMENT_API,
      bodydata,
     { Authorization:`Bearer ${token}` },
    )

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    toast.success("payment successful")
    navigate("/dashboard/mycourses")
    dispatch(resetCart())
 

   } catch (error) { 
    const message =
    error.response?.data?.message || "Something went wrong while verifying payment";
    toast.error(message);
  }
   dispatch(hideSpinner())
}



export async function sendPaymentSuccessEmail(res, amount, token) {

  // const token = JSON.parse(localStorage.getItem("token"))
  // console.log("orderId " +  res.razorpay_order_id,
  //       "paymentId " + res.razorpay_payment_id,
  //       amount,
  //       token)
 
  try {
    const response = await apiConnector(
      "POST",
      SEND_PYMENT_SUCCESS_EMAIL,
      { orderId: res.razorpay_order_id,
        paymentId: res.razorpay_payment_id,
        amount,
        token
       },
      {
        Authorization: `Bearer ${token}`
      })
      console.log(response)


   } catch (error) {
    const message =
    error.response?.data?.message || "Something went wrong while sending email";
    toast.error(message);
  }
 
}


export async function sendPaymentFailEmail(
  descrption,
  paymentId,
  orderId,
  amount,
  token,
) {
  try {
    const response = await apiConnector(
      "POST",
      SEND_PYMENT_FAIL_EMAIL,
      { descrption, paymentId, orderId, amount, token },
      {
        Authorization: `Bearer ${token}`,
      },
    );
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Something went wrong while sending email";
    toast.error(message);
  }
}



