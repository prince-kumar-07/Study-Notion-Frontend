import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {

  cartItems: cartFromStorage,

  totalItem: cartFromStorage.reduce(
    (total, item) => total + item.quantity,
    0
  ),

  totalPrice: cartFromStorage.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  ),

  discount: 0,

  finalPrice: cartFromStorage.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  ),

};

const saveToLocalStorage = (state) => {

  localStorage.setItem(
    "cart",
    JSON.stringify(state.cartItems)
  );

};

const calculateFinalPrice = (state) => {

  state.finalPrice = state.totalPrice - state.discount;

};

const cartSlice = createSlice({

  name: "cart",

  initialState,

  reducers: {

    // ADD TO CART
    addToCart(state, action) {

      const item = action.payload;

      const existItem = state.cartItems.find(
        (i) => i._id === item._id
      );

      if (existItem) {

        toast.error("Already in cart");
        return;

      }

      state.cartItems.push({
        ...item,
        quantity: 1,
      });

      state.totalItem += 1;

      state.totalPrice += item.price;

      calculateFinalPrice(state);

      saveToLocalStorage(state);

      toast.success("Added to cart");

    },

    // REMOVE FROM CART
    removeFromCart(state, action) {

      const itemId = action.payload;

      const existItem = state.cartItems.find(
        (i) => i._id === itemId
      );

      if (!existItem) return;

      state.totalItem -= existItem.quantity;

      state.totalPrice -=
        existItem.quantity * existItem.price;

      state.cartItems = state.cartItems.filter(
        (i) => i._id !== itemId
      );

      calculateFinalPrice(state);

      saveToLocalStorage(state);

      toast.success("Removed from cart");

    },

    // APPLY FIXED DISCOUNT
    applyDiscount(state, action) {

      state.discount = action.payload;

      calculateFinalPrice(state);

      toast.success("Discount applied");

    },

    // APPLY PERCENT DISCOUNT
    applyDiscountPercent(state, action) {

      const percent = action.payload;

      state.discount =
        (state.totalPrice * percent) / 100;

      calculateFinalPrice(state);

      toast.success(`${percent}% discount applied`);

    },

    // CLEAR DISCOUNT
    clearDiscount(state) {

      state.discount = 0;

      calculateFinalPrice(state);

    },

  },

});

export const {

  addToCart,
  removeFromCart,
  applyDiscount,
  applyDiscountPercent,
  clearDiscount,

} = cartSlice.actions;

export default cartSlice.reducer;
