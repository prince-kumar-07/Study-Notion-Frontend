import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {

  cartItems: cartFromStorage,

  cartItemIds: cartFromStorage.map((item) => item._id),

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

      // ADD ID
      state.cartItemIds.push(item._id);

      state.totalItem += 1;

      state.totalPrice += item.price;

      calculateFinalPrice(state);

      saveToLocalStorage(state);

      toast.success("Added to cart");

    },

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

      // REMOVE ID
      state.cartItemIds = state.cartItemIds.filter(
        (id) => id !== itemId
      );

      calculateFinalPrice(state);

      saveToLocalStorage(state);

      toast.success("Removed from cart");

    },

    applyDiscount(state, action) {

      state.discount = action.payload;

      calculateFinalPrice(state);

      toast.success("Discount applied");

    },

    applyDiscountPercent(state, action) {

      const percent = action.payload;

      state.discount =
        (state.totalPrice * percent) / 100;

      calculateFinalPrice(state);

      toast.success(`${percent}% discount applied`);

    },

    clearDiscount(state) {

      state.discount = 0;

      calculateFinalPrice(state);

    },

    resetCart(state) {

      state.cartItems = [];

      // RESET ID ARRAY
      state.cartItemIds = [];

      state.totalItem = 0;

      state.totalPrice = 0;

      state.discount = 0;

      state.finalPrice = 0;

      saveToLocalStorage(state);

      // toast.success("Cart cleared");

    },

  },

});

export const {

  addToCart,
  removeFromCart,
  applyDiscount,
  applyDiscountPercent,
  clearDiscount,
  resetCart,

} = cartSlice.actions;

export default cartSlice.reducer;