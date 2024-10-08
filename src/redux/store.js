import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer'; // Assuming you'll combine multiple reducers


  // Persist configuration
  const persistConfig = {
    key: 'task_management',
    storage,
   
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
    // composeWithDevTools(applyMiddleware(thunk))
  );
  
  const persistor = persistStore(store);
  
  export { store, persistor };
