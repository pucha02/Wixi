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
  async ({ productId, color, size, quantity, userId }, { getState }) => {

    try {
      const response = await fetch(`http://localhost:5000/api/cart/update-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, color, size, quantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка обновления количества товара");
      }

      return data.cart; // Возвращаем обновленную корзину
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
    items: JSON.parse(localStorage.getItem('cart')) || [],
    loading: false,
    error: null,
  },
  reducers: {

    addItem: (state, action) => {
      const { _id, color, size } = action.payload;

      if (!_id || !color?.color_name || !size) {
        console.error('Некорректные данные товара:', action.payload);
        return;
      }

      // Найти существующий элемент с учётом размера
      const existingItem = state.items.find((item) =>
        item._id === _id &&
        item.color.color_name === color.color_name &&
        item.size === size // Проверка точного совпадения размера
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1
        };
        state.items.push(newItem);
      }

      try {
        localStorage.setItem('cart', JSON.stringify(state.items));
      } catch (error) {
        console.error('Ошибка при сохранении данных в localStorage:', error);
      }
    }

    ,

    removeItem: (state, action) => {
      const { _id, color, size } = action.payload;

      if (!_id || !color?.color_name || !size) {
        console.error("Некорректные данные для удаления товара:", action.payload);
        return;
      }

      // Фильтруем элементы, удаляя только тот, который совпадает по всем трём условиям
      state.items = state.items.filter(
        (item) =>
          item._id !== _id && // Либо другой _id
          item.color !== color.color_name &&
          item.size !== size // Либо другой размер
      );

      // Сохраняем обновленную корзину в localStorage
      try {
        localStorage.setItem("cart", JSON.stringify(state.items));
      } catch (error) {
        console.error("Ошибка при сохранении корзины в localStorage:", error);
      }
    },


    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
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

        // Найти существующий элемент в корзине с учетом цвета и размера
        const existingItem = state.items.find((item) =>
          item._id === newItem._id &&
          item.color.color_name === newItem.color.color_name &&
          item.size === newItem.size
        );

        if (existingItem) {
          // Если такой элемент уже есть, увеличиваем его количество
          existingItem.quantity += newItem.quantity || 1; // Используем количество из API или +1
        } else {
          // Если товара нет, добавляем его в корзину
          state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
        }

        // Сохраняем обновлённую корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
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
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },

});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;