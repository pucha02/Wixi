import { combineReducers } from 'redux';
import wishlistReducer from './wishlistReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    wishlist: wishlistReducer
})

export default rootReducer;