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

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, color, size, quantity, userId }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/update-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, color, size, quantity }),
      });

      const data = await response.json();
      console.log("Response from server:", data.updatedProduct); // Логируем ответ сервера

      if (!response.ok) {
        throw new Error(data.error || "Ошибка обновления количества товара");
      }

      return data.updatedProduct; // Убедитесь, что сервер возвращает обновленный товар
    } catch (error) {
      console.error("Ошибка при обновлении количества товара:", error);
      throw error;
    }
  }
);



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
  async ({ userId, productId, item }) => {
    console.log("Удаляемый товар:", { userId, productId, item });

    const response = await fetch('http://localhost:5000/api/cart/remove-from-cart', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, item }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Не вдалося видалити товар з кошика');
    }

    return productId; // Возвращаем id удалённого товара
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      const { _id, color, size, sku } = action.payload;
      const isAuthorized = !!localStorage.getItem("token");

      if (!_id || !color?.color_name || !size) {
        console.error("Некорректные данные товара:", action.payload);
        return;
      }

      const existingItem = state.items.find(
        (item) =>
          item &&
          item._id === _id &&
          item.color.color_name === color.color_name &&
          item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      if (!isAuthorized) {
        try {
          localStorage.setItem("cart", JSON.stringify(state.items));
        } catch (error) {
          console.error("Ошибка при сохранении данных в localStorage:", error);
        }
      }
    },

    removeItem: (state, action) => {
      const { _id, color, size } = action.payload;

      if (!_id || !color?.color_name || !size) {
        console.error("Некорректные данные для удаления товара:", action.payload);
        return;
      }

      state.items = state.items.filter(
        (item) =>
          !(item._id === _id &&
            item.color.color_name === color.color_name &&
            item.size === size)
      );

      try {
        localStorage.setItem("cart", JSON.stringify(state.items));
      } catch (error) {
        console.error("Ошибка при сохранении корзины в localStorage:", error);
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
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
        state.items = action.payload;
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

        if (!newItem || !newItem._id) {
          console.error("Некорректные данные товара при добавлении:", newItem);
          return;
        }

        const existingItem = state.items.find(
          (item) =>
            item &&
            item._id === newItem._id &&
            item.color.color_name === newItem.color.color_name &&
            item.size === newItem.size
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity || 1;
        } else {
          state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
        }

        localStorage.setItem("cart", JSON.stringify(state.items));
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
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const updatedProduct = action.payload;

        if (!updatedProduct || !updatedProduct._id) {
          console.error("Некорректные данные обновленного товара:", updatedProduct);
          return;
        }

        const existingItemIndex = state.items.findIndex(
          (item) =>
            item &&
            item._id === updatedProduct._id &&
            item.color.color_name === updatedProduct.color.color_name &&
            item.size === updatedProduct.size
        );

        if (existingItemIndex !== -1) {
          state.items[existingItemIndex] = {
            ...state.items[existingItemIndex],
            ...updatedProduct,
          };
        } else {
          console.warn("Обновленный товар не найден в корзине, пропуск обновления.");
        }
      });
  },
});


export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;