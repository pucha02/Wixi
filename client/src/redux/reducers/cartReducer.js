import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Получение данных корзины
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/auth/get-information-for-user-cart", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить данные корзины");
  }

  const data = await response.json();

  // Извлечение корзины из ответа
  return data.cart || [];
});


// Добавление элемента в корзину
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ item, userId }) => {
    const response = await fetch("http://localhost:5000/api/cart/add-to-cart", {
      method: "POST",
      body: JSON.stringify({ ...item, userId }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Не удалось добавить товар в корзину");
    }
    
    return await response.json();
  }
);

export const removeItemCart = createAsyncThunk(
  'cart/removeItem',
  async ({ userId, productId }) => {
    console.log(userId)
    const response = await fetch('http://localhost:5000/api/cart/remove-from-cart', {
      method: 'POST',
      body: JSON.stringify({ userId, productId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Не вдалося видалити товар з кошика');
    }

    return productId; // Возвращаем id удалённого товара
  }
);
// Срез для управления состоянием корзины
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [], // Загрузка корзины из localStorage по умолчанию
    loading: false,
    error: null,
  },
  reducers: {
    // Локальное добавление элемента в корзину
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Сохранение корзины в localStorage
    },
    // Удаление элемента из корзины
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Сохранение корзины в localStorage
    },
    // Очистка корзины
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items)); // Очистка корзины в localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Обновляем данные корзины
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;
        const existingItem = state.items.find((item) => item._id === newItem._id);
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...newItem, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(state.items)); // Сохранение корзины в localStorage
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeItemCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeItemCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
