/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/redux/reducers/cartReducer.js":
/*!*******************************************!*\
  !*** ./src/redux/reducers/cartReducer.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval(__webpack_require__.ts("// import { createSlice, createAsyncThunk } from \"@reduxjs/toolkit\";\n// // Получение данных корзины\n// export const fetchCart = createAsyncThunk(\"cart/fetchCart\", async () => {\n//   const token = localStorage.getItem(\"token\");\n//   const response = await fetch(\n//     \"http://localhost:5001/api/auth/get-information-for-user-cart\",\n//     {\n//       method: \"GET\",\n//       headers: {\n//         Authorization: `Bearer ${token}`,\n//       },\n//     }\n//   );\n//   if (!response.ok) {\n//     throw new Error(\"Не удалось загрузить данные корзины\");\n//   }\n//   const data = await response.json();\n//   // Извлечение корзины из ответа\n//   return data.cart || [];\n// });\n// export const updateCartItemQuantity = createAsyncThunk(\n//   \"cart/updateCartItemQuantity\",\n//   async ({ productId, color, size, quantity, userId }) => {\n//     try {\n//       const response = await fetch(\n//         `http://localhost:5001/api/cart/update-cart`,\n//         {\n//           method: \"POST\",\n//           headers: { \"Content-Type\": \"application/json\" },\n//           body: JSON.stringify({ userId, productId, color, size, quantity }),\n//         }\n//       );\n//       const data = await response.json();\n//       console.log(\"Response from server:\", data.updatedProduct); // Логируем ответ сервера\n//       if (!response.ok) {\n//         throw new Error(data.error || \"Ошибка обновления количества товара\");\n//       }\n//       return data.updatedProduct; // Убедитесь, что сервер возвращает обновленный товар\n//     } catch (error) {\n//       console.error(\"Ошибка при обновлении количества товара:\", error);\n//       throw error;\n//     }\n//   }\n// );\n// // Добавление элемента в корзину\n// export const addItemToCart = createAsyncThunk(\n//   \"cart/addItemToCart\",\n//   async ({ item, userId }) => {\n//     const response = await fetch(\"http://localhost:5001/api/cart/add-to-cart\", {\n//       method: \"POST\",\n//       body: JSON.stringify({ ...item, userId }),\n//       headers: { \"Content-Type\": \"application/json\" },\n//     });\n//     if (!response.ok) {\n//       throw new Error(\"Не удалось добавить товар в корзину\");\n//     }\n//     return await response.json();\n//   }\n// );\n// export const removeItemCart = createAsyncThunk(\n//   \"cart/removeItem\",\n//   async ({ userId, productId, item }) => {\n//     console.log(\"Удаляемый товар:\", { userId, productId, item });\n//     const response = await fetch(\n//       \"http://localhost:5001/api/cart/remove-from-cart\",\n//       {\n//         method: \"POST\",\n//         body: JSON.stringify({ userId, productId, item }),\n//         headers: { \"Content-Type\": \"application/json\" },\n//       }\n//     );\n//     if (!response.ok) {\n//       throw new Error(\"Не вдалося видалити товар з кошика\");\n//     }\n//     return productId; // Возвращаем id удалённого товара\n//   }\n// );\n// const cartSlice = createSlice({\n//   name: \"cart\",\n//   initialState: {\n//     items: JSON.parse(localStorage.getItem(\"cart\")) || [],\n//     loading: false,\n//     error: null,\n//   },\n//   reducers: {\n//     addItem: (state, action) => {\n//       const { _id, color, size, sku } = action.payload;\n//       const isAuthorized = !!localStorage.getItem(\"token\");\n//       if (!_id || !color?.color_name || !size) {\n//         console.error(\"Некорректные данные товара:\", action.payload);\n//         return;\n//       }\n//       const existingItem = state.items.find(\n//         (item) =>\n//           item &&\n//           item._id === _id &&\n//           item.color.color_name === color.color_name &&\n//           item.size === size\n//       );\n//       if (existingItem) {\n//         existingItem.quantity += 1;\n//       } else {\n//         state.items.push({ ...action.payload, quantity: 1 });\n//       }\n//       if (!isAuthorized) {\n//         try {\n//           localStorage.setItem(\"cart\", JSON.stringify(state.items));\n//         } catch (error) {\n//           console.error(\"Ошибка при сохранении данных в localStorage:\", error);\n//         }\n//       }\n//     },\n//     removeItem: (state, action) => {\n//       const { _id, color, size } = action.payload;\n//       if (!_id || !color?.color_name || !size) {\n//         console.error(\n//           \"Некорректные данные для удаления товара:\",\n//           action.payload\n//         );\n//         return;\n//       }\n//       state.items = state.items.filter(\n//         (item) =>\n//           !(\n//             item._id === _id &&\n//             item.color.color_name === color.color_name &&\n//             item.size === size\n//           )\n//       );\n//       try {\n//         localStorage.setItem(\"cart\", JSON.stringify(state.items));\n//       } catch (error) {\n//         console.error(\"Ошибка при сохранении корзины в localStorage:\", error);\n//       }\n//     },\n//     clearCart: (state) => {\n//       state.items = [];\n//       localStorage.setItem(\"cart\", JSON.stringify(state.items));\n//     },\n//   },\n//   extraReducers: (builder) => {\n//     builder\n//       .addCase(fetchCart.pending, (state) => {\n//         state.loading = true;\n//         state.error = null;\n//       })\n//       .addCase(fetchCart.fulfilled, (state, action) => {\n//         state.loading = false;\n//         state.items = action.payload;\n//       })\n//       .addCase(fetchCart.rejected, (state, action) => {\n//         state.loading = false;\n//         state.error = action.error.message;\n//       })\n//       .addCase(addItemToCart.pending, (state) => {\n//         state.loading = true;\n//         state.error = null;\n//       })\n//       .addCase(addItemToCart.fulfilled, (state, action) => {\n//         state.loading = false;\n//         const newItem = action.payload;\n//         if (!newItem || !newItem._id) {\n//           console.error(\"Некорректные данные товара при добавлении:\", newItem);\n//           return;\n//         }\n//         const existingItem = state.items.find(\n//           (item) =>\n//             item &&\n//             item._id === newItem._id &&\n//             item.color.color_name === newItem.color.color_name &&\n//             item.size === newItem.size\n//         );\n//         if (existingItem) {\n//           existingItem.quantity += newItem.quantity || 1;\n//         } else {\n//           state.items.push({ ...newItem, quantity: newItem.quantity || 1 });\n//         }\n//         localStorage.setItem(\"cart\", JSON.stringify(state.items));\n//       })\n//       .addCase(addItemToCart.rejected, (state, action) => {\n//         state.loading = false;\n//         state.error = action.error.message;\n//       })\n//       .addCase(removeItemCart.pending, (state) => {\n//         state.loading = true;\n//         state.error = null;\n//       })\n//       .addCase(removeItemCart.fulfilled, (state, action) => {\n//         state.loading = false;\n//         state.items = state.items.filter((item) => item._id !== action.payload);\n//       })\n//       .addCase(removeItemCart.rejected, (state, action) => {\n//         state.loading = false;\n//         state.error = action.error.message;\n//       })\n//       .addCase(updateCartItemQuantity.fulfilled, (state, action) => {\n//         const updatedProduct = action.payload;\n//         if (!updatedProduct || !updatedProduct._id) {\n//           console.error(\n//             \"Некорректные данные обновленного товара:\",\n//             updatedProduct\n//           );\n//           return;\n//         }\n//         const existingItemIndex = state.items.findIndex(\n//           (item) =>\n//             item &&\n//             item._id === updatedProduct._id &&\n//             item.color.color_name === updatedProduct.color.color_name &&\n//             item.size === updatedProduct.size\n//         );\n//         if (existingItemIndex !== -1) {\n//           state.items[existingItemIndex] = {\n//             ...state.items[existingItemIndex],\n//             ...updatedProduct,\n//           };\n//         } else {\n//           console.warn(\n//             \"Обновленный товар не найден в корзине, пропуск обновления.\"\n//           );\n//         }\n//       });\n//   },\n// });\n// export const { addItem, removeItem, clearCart } = cartSlice.actions;\n// export default cartSlice.reducer;\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFlO0FBQ2YsbUJBQW1CO0FBQ25CLDBCQUEwQjtBQUMxQiwyRUFBMkU7QUFDM0UsZUFBZTtBQUNmLFlBQVk7QUFDWixZQUFZO0FBQ1osT0FBTztBQUNQLE1BQU07QUFFTix1RUFBdUU7QUFDdkUsb0NBQW9DIiwic291cmNlcyI6WyIvVXNlcnMvZGFuaWwvRG9jdW1lbnRzL0dpdEh1Yi93aXhpL2NsaWVudC9zcmMvcmVkdXgvcmVkdWNlcnMvY2FydFJlZHVjZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgY3JlYXRlU2xpY2UsIGNyZWF0ZUFzeW5jVGh1bmsgfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xuXG4vLyAvLyDQn9C+0LvRg9GH0LXQvdC40LUg0LTQsNC90L3Ri9GFINC60L7RgNC30LjQvdGLXG4vLyBleHBvcnQgY29uc3QgZmV0Y2hDYXJ0ID0gY3JlYXRlQXN5bmNUaHVuayhcImNhcnQvZmV0Y2hDYXJ0XCIsIGFzeW5jICgpID0+IHtcbi8vICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xuXG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4vLyAgICAgXCJodHRwOi8vbG9jYWxob3N0OjUwMDEvYXBpL2F1dGgvZ2V0LWluZm9ybWF0aW9uLWZvci11c2VyLWNhcnRcIixcbi8vICAgICB7XG4vLyAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4vLyAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuLy8gICAgICAgfSxcbi8vICAgICB9XG4vLyAgICk7XG5cbi8vICAgaWYgKCFyZXNwb25zZS5vaykge1xuLy8gICAgIHRocm93IG5ldyBFcnJvcihcItCd0LUg0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMINC00LDQvdC90YvQtSDQutC+0YDQt9C40L3Ri1wiKTtcbi8vICAgfVxuXG4vLyAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbi8vICAgLy8g0JjQt9Cy0LvQtdGH0LXQvdC40LUg0LrQvtGA0LfQuNC90Ysg0LjQtyDQvtGC0LLQtdGC0LBcbi8vICAgcmV0dXJuIGRhdGEuY2FydCB8fCBbXTtcbi8vIH0pO1xuXG4vLyBleHBvcnQgY29uc3QgdXBkYXRlQ2FydEl0ZW1RdWFudGl0eSA9IGNyZWF0ZUFzeW5jVGh1bmsoXG4vLyAgIFwiY2FydC91cGRhdGVDYXJ0SXRlbVF1YW50aXR5XCIsXG4vLyAgIGFzeW5jICh7IHByb2R1Y3RJZCwgY29sb3IsIHNpemUsIHF1YW50aXR5LCB1c2VySWQgfSkgPT4ge1xuLy8gICAgIHRyeSB7XG4vLyAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuLy8gICAgICAgICBgaHR0cDovL2xvY2FsaG9zdDo1MDAxL2FwaS9jYXJ0L3VwZGF0ZS1jYXJ0YCxcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4vLyAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuLy8gICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcklkLCBwcm9kdWN0SWQsIGNvbG9yLCBzaXplLCBxdWFudGl0eSB9KSxcbi8vICAgICAgICAgfVxuLy8gICAgICAgKTtcblxuLy8gICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgZnJvbSBzZXJ2ZXI6XCIsIGRhdGEudXBkYXRlZFByb2R1Y3QpOyAvLyDQm9C+0LPQuNGA0YPQtdC8INC+0YLQstC10YIg0YHQtdGA0LLQtdGA0LBcblxuLy8gICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuLy8gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCBcItCe0YjQuNCx0LrQsCDQvtCx0L3QvtCy0LvQtdC90LjRjyDQutC+0LvQuNGH0LXRgdGC0LLQsCDRgtC+0LLQsNGA0LBcIik7XG4vLyAgICAgICB9XG5cbi8vICAgICAgIHJldHVybiBkYXRhLnVwZGF0ZWRQcm9kdWN0OyAvLyDQo9Cx0LXQtNC40YLQtdGB0YwsINGH0YLQviDRgdC10YDQstC10YAg0LLQvtC30LLRgNCw0YnQsNC10YIg0L7QsdC90L7QstC70LXQvdC90YvQuSDRgtC+0LLQsNGAXG4vLyAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INC+0LHQvdC+0LLQu9C10L3QuNC4INC60L7Qu9C40YfQtdGB0YLQstCwINGC0L7QstCw0YDQsDpcIiwgZXJyb3IpO1xuLy8gICAgICAgdGhyb3cgZXJyb3I7XG4vLyAgICAgfVxuLy8gICB9XG4vLyApO1xuXG4vLyAvLyDQlNC+0LHQsNCy0LvQtdC90LjQtSDRjdC70LXQvNC10L3RgtCwINCyINC60L7RgNC30LjQvdGDXG4vLyBleHBvcnQgY29uc3QgYWRkSXRlbVRvQ2FydCA9IGNyZWF0ZUFzeW5jVGh1bmsoXG4vLyAgIFwiY2FydC9hZGRJdGVtVG9DYXJ0XCIsXG4vLyAgIGFzeW5jICh7IGl0ZW0sIHVzZXJJZCB9KSA9PiB7XG4vLyAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9hcGkvY2FydC9hZGQtdG8tY2FydFwiLCB7XG4vLyAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuLy8gICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyAuLi5pdGVtLCB1c2VySWQgfSksXG4vLyAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4vLyAgICAgfSk7XG5cbi8vICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4vLyAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCLQndC1INGD0LTQsNC70L7RgdGMINC00L7QsdCw0LLQuNGC0Ywg0YLQvtCy0LDRgCDQsiDQutC+0YDQt9C40L3Rg1wiKTtcbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuLy8gICB9XG4vLyApO1xuXG4vLyBleHBvcnQgY29uc3QgcmVtb3ZlSXRlbUNhcnQgPSBjcmVhdGVBc3luY1RodW5rKFxuLy8gICBcImNhcnQvcmVtb3ZlSXRlbVwiLFxuLy8gICBhc3luYyAoeyB1c2VySWQsIHByb2R1Y3RJZCwgaXRlbSB9KSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coXCLQo9C00LDQu9GP0LXQvNGL0Lkg0YLQvtCy0LDRgDpcIiwgeyB1c2VySWQsIHByb2R1Y3RJZCwgaXRlbSB9KTtcblxuLy8gICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4vLyAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9hcGkvY2FydC9yZW1vdmUtZnJvbS1jYXJ0XCIsXG4vLyAgICAgICB7XG4vLyAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4vLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcklkLCBwcm9kdWN0SWQsIGl0ZW0gfSksXG4vLyAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbi8vICAgICAgIH1cbi8vICAgICApO1xuXG4vLyAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuLy8gICAgICAgdGhyb3cgbmV3IEVycm9yKFwi0J3QtSDQstC00LDQu9C+0YHRjyDQstC40LTQsNC70LjRgtC4INGC0L7QstCw0YAg0Lcg0LrQvtGI0LjQutCwXCIpO1xuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiBwcm9kdWN0SWQ7IC8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdC8IGlkINGD0LTQsNC70ZHQvdC90L7Qs9C+INGC0L7QstCw0YDQsFxuLy8gICB9XG4vLyApO1xuXG4vLyBjb25zdCBjYXJ0U2xpY2UgPSBjcmVhdGVTbGljZSh7XG4vLyAgIG5hbWU6IFwiY2FydFwiLFxuLy8gICBpbml0aWFsU3RhdGU6IHtcbi8vICAgICBpdGVtczogSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhcnRcIikpIHx8IFtdLFxuLy8gICAgIGxvYWRpbmc6IGZhbHNlLFxuLy8gICAgIGVycm9yOiBudWxsLFxuLy8gICB9LFxuLy8gICByZWR1Y2Vyczoge1xuLy8gICAgIGFkZEl0ZW06IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4vLyAgICAgICBjb25zdCB7IF9pZCwgY29sb3IsIHNpemUsIHNrdSB9ID0gYWN0aW9uLnBheWxvYWQ7XG4vLyAgICAgICBjb25zdCBpc0F1dGhvcml6ZWQgPSAhIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XG5cbi8vICAgICAgIGlmICghX2lkIHx8ICFjb2xvcj8uY29sb3JfbmFtZSB8fCAhc2l6ZSkge1xuLy8gICAgICAgICBjb25zb2xlLmVycm9yKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C1INC00LDQvdC90YvQtSDRgtC+0LLQsNGA0LA6XCIsIGFjdGlvbi5wYXlsb2FkKTtcbi8vICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKFxuLy8gICAgICAgICAoaXRlbSkgPT5cbi8vICAgICAgICAgICBpdGVtICYmXG4vLyAgICAgICAgICAgaXRlbS5faWQgPT09IF9pZCAmJlxuLy8gICAgICAgICAgIGl0ZW0uY29sb3IuY29sb3JfbmFtZSA9PT0gY29sb3IuY29sb3JfbmFtZSAmJlxuLy8gICAgICAgICAgIGl0ZW0uc2l6ZSA9PT0gc2l6ZVxuLy8gICAgICAgKTtcblxuLy8gICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuLy8gICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgKz0gMTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHN0YXRlLml0ZW1zLnB1c2goeyAuLi5hY3Rpb24ucGF5bG9hZCwgcXVhbnRpdHk6IDEgfSk7XG4vLyAgICAgICB9XG5cbi8vICAgICAgIGlmICghaXNBdXRob3JpemVkKSB7XG4vLyAgICAgICAgIHRyeSB7XG4vLyAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXJ0XCIsIEpTT04uc3RyaW5naWZ5KHN0YXRlLml0ZW1zKSk7XG4vLyAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgICAgICAgY29uc29sZS5lcnJvcihcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YHQvtGF0YDQsNC90LXQvdC40Lgg0LTQsNC90L3Ri9GFINCyIGxvY2FsU3RvcmFnZTpcIiwgZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSxcblxuLy8gICAgIHJlbW92ZUl0ZW06IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4vLyAgICAgICBjb25zdCB7IF9pZCwgY29sb3IsIHNpemUgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4vLyAgICAgICBpZiAoIV9pZCB8fCAhY29sb3I/LmNvbG9yX25hbWUgfHwgIXNpemUpIHtcbi8vICAgICAgICAgY29uc29sZS5lcnJvcihcbi8vICAgICAgICAgICBcItCd0LXQutC+0YDRgNC10LrRgtC90YvQtSDQtNCw0L3QvdGL0LUg0LTQu9GPINGD0LTQsNC70LXQvdC40Y8g0YLQvtCy0LDRgNCwOlwiLFxuLy8gICAgICAgICAgIGFjdGlvbi5wYXlsb2FkXG4vLyAgICAgICAgICk7XG4vLyAgICAgICAgIHJldHVybjtcbi8vICAgICAgIH1cblxuLy8gICAgICAgc3RhdGUuaXRlbXMgPSBzdGF0ZS5pdGVtcy5maWx0ZXIoXG4vLyAgICAgICAgIChpdGVtKSA9PlxuLy8gICAgICAgICAgICEoXG4vLyAgICAgICAgICAgICBpdGVtLl9pZCA9PT0gX2lkICYmXG4vLyAgICAgICAgICAgICBpdGVtLmNvbG9yLmNvbG9yX25hbWUgPT09IGNvbG9yLmNvbG9yX25hbWUgJiZcbi8vICAgICAgICAgICAgIGl0ZW0uc2l6ZSA9PT0gc2l6ZVxuLy8gICAgICAgICAgIClcbi8vICAgICAgICk7XG5cbi8vICAgICAgIHRyeSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2FydFwiLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5pdGVtcykpO1xuLy8gICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgICAgY29uc29sZS5lcnJvcihcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YHQvtGF0YDQsNC90LXQvdC40Lgg0LrQvtGA0LfQuNC90Ysg0LIgbG9jYWxTdG9yYWdlOlwiLCBlcnJvcik7XG4vLyAgICAgICB9XG4vLyAgICAgfSxcblxuLy8gICAgIGNsZWFyQ2FydDogKHN0YXRlKSA9PiB7XG4vLyAgICAgICBzdGF0ZS5pdGVtcyA9IFtdO1xuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXJ0XCIsIEpTT04uc3RyaW5naWZ5KHN0YXRlLml0ZW1zKSk7XG4vLyAgICAgfSxcbi8vICAgfSxcbi8vICAgZXh0cmFSZWR1Y2VyczogKGJ1aWxkZXIpID0+IHtcbi8vICAgICBidWlsZGVyXG4vLyAgICAgICAuYWRkQ2FzZShmZXRjaENhcnQucGVuZGluZywgKHN0YXRlKSA9PiB7XG4vLyAgICAgICAgIHN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuLy8gICAgICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XG4vLyAgICAgICB9KVxuLy8gICAgICAgLmFkZENhc2UoZmV0Y2hDYXJ0LmZ1bGZpbGxlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcbi8vICAgICAgICAgc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuLy8gICAgICAgICBzdGF0ZS5pdGVtcyA9IGFjdGlvbi5wYXlsb2FkO1xuLy8gICAgICAgfSlcbi8vICAgICAgIC5hZGRDYXNlKGZldGNoQ2FydC5yZWplY3RlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcbi8vICAgICAgICAgc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuLy8gICAgICAgICBzdGF0ZS5lcnJvciA9IGFjdGlvbi5lcnJvci5tZXNzYWdlO1xuLy8gICAgICAgfSlcbi8vICAgICAgIC5hZGRDYXNlKGFkZEl0ZW1Ub0NhcnQucGVuZGluZywgKHN0YXRlKSA9PiB7XG4vLyAgICAgICAgIHN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuLy8gICAgICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XG4vLyAgICAgICB9KVxuLy8gICAgICAgLmFkZENhc2UoYWRkSXRlbVRvQ2FydC5mdWxmaWxsZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4vLyAgICAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbi8vICAgICAgICAgY29uc3QgbmV3SXRlbSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4vLyAgICAgICAgIGlmICghbmV3SXRlbSB8fCAhbmV3SXRlbS5faWQpIHtcbi8vICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C1INC00LDQvdC90YvQtSDRgtC+0LLQsNGA0LAg0L/RgNC4INC00L7QsdCw0LLQu9C10L3QuNC4OlwiLCBuZXdJdGVtKTtcbi8vICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKFxuLy8gICAgICAgICAgIChpdGVtKSA9PlxuLy8gICAgICAgICAgICAgaXRlbSAmJlxuLy8gICAgICAgICAgICAgaXRlbS5faWQgPT09IG5ld0l0ZW0uX2lkICYmXG4vLyAgICAgICAgICAgICBpdGVtLmNvbG9yLmNvbG9yX25hbWUgPT09IG5ld0l0ZW0uY29sb3IuY29sb3JfbmFtZSAmJlxuLy8gICAgICAgICAgICAgaXRlbS5zaXplID09PSBuZXdJdGVtLnNpemVcbi8vICAgICAgICAgKTtcblxuLy8gICAgICAgICBpZiAoZXhpc3RpbmdJdGVtKSB7XG4vLyAgICAgICAgICAgZXhpc3RpbmdJdGVtLnF1YW50aXR5ICs9IG5ld0l0ZW0ucXVhbnRpdHkgfHwgMTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBzdGF0ZS5pdGVtcy5wdXNoKHsgLi4ubmV3SXRlbSwgcXVhbnRpdHk6IG5ld0l0ZW0ucXVhbnRpdHkgfHwgMSB9KTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2FydFwiLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5pdGVtcykpO1xuLy8gICAgICAgfSlcbi8vICAgICAgIC5hZGRDYXNlKGFkZEl0ZW1Ub0NhcnQucmVqZWN0ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4vLyAgICAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbi8vICAgICAgICAgc3RhdGUuZXJyb3IgPSBhY3Rpb24uZXJyb3IubWVzc2FnZTtcbi8vICAgICAgIH0pXG4vLyAgICAgICAuYWRkQ2FzZShyZW1vdmVJdGVtQ2FydC5wZW5kaW5nLCAoc3RhdGUpID0+IHtcbi8vICAgICAgICAgc3RhdGUubG9hZGluZyA9IHRydWU7XG4vLyAgICAgICAgIHN0YXRlLmVycm9yID0gbnVsbDtcbi8vICAgICAgIH0pXG4vLyAgICAgICAuYWRkQ2FzZShyZW1vdmVJdGVtQ2FydC5mdWxmaWxsZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4vLyAgICAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbi8vICAgICAgICAgc3RhdGUuaXRlbXMgPSBzdGF0ZS5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uX2lkICE9PSBhY3Rpb24ucGF5bG9hZCk7XG4vLyAgICAgICB9KVxuLy8gICAgICAgLmFkZENhc2UocmVtb3ZlSXRlbUNhcnQucmVqZWN0ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4vLyAgICAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbi8vICAgICAgICAgc3RhdGUuZXJyb3IgPSBhY3Rpb24uZXJyb3IubWVzc2FnZTtcbi8vICAgICAgIH0pXG4vLyAgICAgICAuYWRkQ2FzZSh1cGRhdGVDYXJ0SXRlbVF1YW50aXR5LmZ1bGZpbGxlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcbi8vICAgICAgICAgY29uc3QgdXBkYXRlZFByb2R1Y3QgPSBhY3Rpb24ucGF5bG9hZDtcblxuLy8gICAgICAgICBpZiAoIXVwZGF0ZWRQcm9kdWN0IHx8ICF1cGRhdGVkUHJvZHVjdC5faWQpIHtcbi8vICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuLy8gICAgICAgICAgICAgXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0LUg0LTQsNC90L3Ri9C1INC+0LHQvdC+0LLQu9C10L3QvdC+0LPQviDRgtC+0LLQsNGA0LA6XCIsXG4vLyAgICAgICAgICAgICB1cGRhdGVkUHJvZHVjdFxuLy8gICAgICAgICAgICk7XG4vLyAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgY29uc3QgZXhpc3RpbmdJdGVtSW5kZXggPSBzdGF0ZS5pdGVtcy5maW5kSW5kZXgoXG4vLyAgICAgICAgICAgKGl0ZW0pID0+XG4vLyAgICAgICAgICAgICBpdGVtICYmXG4vLyAgICAgICAgICAgICBpdGVtLl9pZCA9PT0gdXBkYXRlZFByb2R1Y3QuX2lkICYmXG4vLyAgICAgICAgICAgICBpdGVtLmNvbG9yLmNvbG9yX25hbWUgPT09IHVwZGF0ZWRQcm9kdWN0LmNvbG9yLmNvbG9yX25hbWUgJiZcbi8vICAgICAgICAgICAgIGl0ZW0uc2l6ZSA9PT0gdXBkYXRlZFByb2R1Y3Quc2l6ZVxuLy8gICAgICAgICApO1xuXG4vLyAgICAgICAgIGlmIChleGlzdGluZ0l0ZW1JbmRleCAhPT0gLTEpIHtcbi8vICAgICAgICAgICBzdGF0ZS5pdGVtc1tleGlzdGluZ0l0ZW1JbmRleF0gPSB7XG4vLyAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtc1tleGlzdGluZ0l0ZW1JbmRleF0sXG4vLyAgICAgICAgICAgICAuLi51cGRhdGVkUHJvZHVjdCxcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGNvbnNvbGUud2Fybihcbi8vICAgICAgICAgICAgIFwi0J7QsdC90L7QstC70LXQvdC90YvQuSDRgtC+0LLQsNGAINC90LUg0L3QsNC50LTQtdC9INCyINC60L7RgNC30LjQvdC1LCDQv9GA0L7Qv9GD0YHQuiDQvtCx0L3QvtCy0LvQtdC90LjRjy5cIlxuLy8gICAgICAgICAgICk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuLy8gICB9LFxuLy8gfSk7XG5cbi8vIGV4cG9ydCBjb25zdCB7IGFkZEl0ZW0sIHJlbW92ZUl0ZW0sIGNsZWFyQ2FydCB9ID0gY2FydFNsaWNlLmFjdGlvbnM7XG4vLyBleHBvcnQgZGVmYXVsdCBjYXJ0U2xpY2UucmVkdWNlcjtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/redux/reducers/cartReducer.js\n"));

/***/ }),

/***/ "./src/redux/reducers/index.js":
/*!*************************************!*\
  !*** ./src/redux/reducers/index.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ \"./node_modules/redux/dist/redux.mjs\");\n/* harmony import */ var _wishlistReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wishlistReducer */ \"./src/redux/reducers/wishlistReducer.js\");\n/* harmony import */ var _cartReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartReducer */ \"./src/redux/reducers/cartReducer.js\");\n/* harmony import */ var _cartReducer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cartReducer__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar rootReducer = (0,redux__WEBPACK_IMPORTED_MODULE_2__.combineReducers)({\n    cart: (_cartReducer__WEBPACK_IMPORTED_MODULE_1___default()),\n    wishlist: _wishlistReducer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootReducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVkdXgvcmVkdWNlcnMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0M7QUFDUTtBQUNSO0FBRXhDLElBQU1HLGNBQWNILHNEQUFlQSxDQUFDO0lBQ2hDSSxNQUFNRixxREFBV0E7SUFDakJHLFVBQVVKLHdEQUFlQTtBQUM3QjtBQUVBLGlFQUFlRSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvZGFuaWwvRG9jdW1lbnRzL0dpdEh1Yi93aXhpL2NsaWVudC9zcmMvcmVkdXgvcmVkdWNlcnMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHdpc2hsaXN0UmVkdWNlciBmcm9tICcuL3dpc2hsaXN0UmVkdWNlcic7XG5pbXBvcnQgY2FydFJlZHVjZXIgZnJvbSAnLi9jYXJ0UmVkdWNlcic7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBjYXJ0OiBjYXJ0UmVkdWNlcixcbiAgICB3aXNobGlzdDogd2lzaGxpc3RSZWR1Y2VyXG59KVxuXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjsiXSwibmFtZXMiOlsiY29tYmluZVJlZHVjZXJzIiwid2lzaGxpc3RSZWR1Y2VyIiwiY2FydFJlZHVjZXIiLCJyb290UmVkdWNlciIsImNhcnQiLCJ3aXNobGlzdCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/redux/reducers/index.js\n"));

/***/ })

});