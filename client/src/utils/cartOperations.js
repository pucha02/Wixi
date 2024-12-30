import { fetchCart } from "../redux/reducers/cartReducer";
import NoImg from '../assets/svg/no-iamge.svg'
// localhost:5000
export const removeFromCart = async (userId, productId) => {
  const response = await fetch('http://localhost:5000/api/cart/remove-from-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId })
  });

  if (!response.ok) {
    throw new Error('Failed to remove product from cart');
  }
  return response.json();
};

export const handleRemoveItem = (
  productId,
  product,
  dispatch,
  removeItemCart,
  localProducts,
  updateLocalProducts, // Функция для обновления локального состояния
  removeItem,
  updateTotalCost
) => {
  const isAuthorized = !!localStorage.getItem("token");

  if (isAuthorized) {
    const userId = localStorage.getItem("userid");

    dispatch(removeItemCart({ userId, productId, item: product })).then(() => {
      dispatch(fetchCart());
    });
  } else {
    const { _id, color, size } = product;

    // Удаляем элемент из локальных продуктов
    const updatedProducts = localProducts.filter(
      (item) =>
        item._id !== _id ||
        item.color.color_name !== color.color_name ||
        item.size !== size
    );

    updateLocalProducts(updatedProducts); // Обновляем состояние локальной корзины
    dispatch(removeItem({ _id, color, size })); // Обновляем Redux для соответствия
    updateTotalCost(updatedProducts); // Обновляем общую стоимость
  }
};

export const handleAddToCart = (product, activeColor, activeSize, dispatch, addItemToCart, addItem, token, sku, id, availableQuantity) => {
  const hasDiscount = product.discount?.percentage > 0;
  const discountedCost = hasDiscount
    ? product.cost - (product.cost * product.discount.percentage) / 100
    : product.cost;

  const imageLink = activeColor?.img?.[0]?.img_link || NoImg;

  const item = {
    title: product.title,
    _id: product._id,
    cost: discountedCost,
    color: activeColor,
    size: activeSize,
    sku: sku,
    id: id,
    relatedProducts: product.relatedProducts,
    availableQuantity: availableQuantity,
    quantity: 1,
    ...(hasDiscount && { originalCost: product.cost }),
    ...(hasDiscount && { discount: product.discount.percentage }),
    img: imageLink,
  };

  if (token) {
    const userId = localStorage.getItem('userid');
    dispatch(addItemToCart({ item, userId })).then(() => {
      dispatch(fetchCart());
    });
  } else {
    dispatch(addItem(item));
    console.log(item)
  }
};

export const handleQuantityChange = (
  newCount,
  product,
  isAuthorized,
  localProducts,
  setLocalProducts,
  dispatch,
  updateCartItemQuantity,
  updateTotalCost
) => {
  const { _id, color, size } = product;

  if (isAuthorized) {
    const userId = localStorage.getItem("userid");
    dispatch(
      updateCartItemQuantity({
        productId: _id,
        color: color,
        size,
        quantity: newCount,
        userId,
      })
    )
  } else {
    const updatedProducts = localProducts.map((item) =>
      item._id === _id &&
        item.color.color_name === color.color_name &&
        item.size === size
        ? { ...item, quantity: newCount }
        : item
    );
    setLocalProducts(updatedProducts); // Обновляем локальные продукты
    updateTotalCost(updatedProducts); // Обновляем общую стоимость
  }
};
