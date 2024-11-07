import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchCart = () =>
//   createAsyncThunk("cart/fetchCart", async (item) => {
//     const response = await fetch("");
//     return await response.json();
//   });

// export const addItemToCart = createAsyncThunk(
//   "cart/addItemToCart",
//   async (item) => {
//     const response = await fetch("/api/cart", {
//       method: "POST",
//       body: JSON.stringify(item),
//       headers: { "Content-Type": "application/json" },
//     });
//     return await response.json();
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },

//   extraReducers: (builder) => {
//     builder

//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addItemToCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items.push(action.payload);
//       })
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
  //},
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;