import { configureStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'

const store = configureStore({
    reducer: rootReducer,
})

export default store;