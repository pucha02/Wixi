

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
