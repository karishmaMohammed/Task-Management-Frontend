import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer'; // Assuming you'll combine multiple reducers

const store = createStore(rootReducer);

export default store;
