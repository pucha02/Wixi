import axios from "axios";

export const FETCH_WISHLIST_REQUEST = "FETCH_WISHLIST_REQUEST";
export const FETCH_WISHLIST_SUCCESS = "FETCH_WISHLIST_SUCCESS";
export const FETCH_WISHLIST_FAILURE = "FETCH_WISHLIST_FAILURE";

export const fetchWishlistItems = () => async (dispatch) => {
  dispatch({ type: FETCH_WISHLIST_REQUEST });
  try {
    const response = await axios.get("");
    dispatch({type: FETCH_WISHLIST_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({ type: FETCH_WISHLIST_FAILURE, payload: error.message });
  }
};