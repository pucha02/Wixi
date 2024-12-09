export const handleAddToWishList = (productId, setLikedItems) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };