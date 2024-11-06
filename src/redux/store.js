import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Fix import for thunk middleware
// import { composeWithDevTools } from 'redux-devtools-extension'; // Uncomment if needed
import rootReducer from './reducers/rootReducer'; // Assuming you'll combine multiple reducers

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  // composeWithDevTools(applyMiddleware(thunk)) // Uncomment if using Redux DevTools in development
);

export { store };
