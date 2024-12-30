import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: JSON.parse(localStorage.getItem("wishlist")) || [],
    loading: false,
    error: null,
  },
  reducers: {
    addItemToWishlist: (state, action) => {
      const className = "active";
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.items.push({ ...action.payload, className });
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
      console.log("addItemToWishist - done");
    },
    removeItemFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      console.log("removeItemFromWishlist - done"); // Сохранение корзины в localStorage
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
