const initialState = {
  items: [],
  loading: true,
  error: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_WISHLIST_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_WISHLIST_SUCCESS":
      return { ...state, loading: false, items: action.payload };

    case "FETCH_WISHLIST_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default wishlistReducer;