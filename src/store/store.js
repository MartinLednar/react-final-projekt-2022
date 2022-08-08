import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//currying = funkcia ktora vracia inu funkciu

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);

  console.log("next state", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnharcers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnharcers);

export const persistor = persistStore(store);
