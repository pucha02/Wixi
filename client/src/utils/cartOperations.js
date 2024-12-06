import { fetchCart } from "../redux/reducers/cartReducer";
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

export const handleAddToCart = (product, activeColor, activeSize, dispatch, addItemToCart, addItem, token) => {
    
    const hasDiscount = product.discount?.percentage > 0;
    const discountedCost = hasDiscount
      ? product.cost - (product.cost * product.discount.percentage) / 100
      : product.cost;

      const item = {
      title: product.title,
      _id: product._id,
      cost: discountedCost,
      color: activeColor,
      size: activeSize,
      quantity: 1,
      ...(hasDiscount && { originalCost: product.cost }),
      ...(hasDiscount && { discount: product.discount.percentage }),
      img: activeColor.img[0].img_link
    };
    console.log(item)
    if (token) {
      const userId = localStorage.getItem('userid');
      dispatch(addItemToCart({ item, userId })).then(() => {
        dispatch(fetchCart());
      });
    } else {
      dispatch(addItem(item))
      console.log(item);
    }
  };
  