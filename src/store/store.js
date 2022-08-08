import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "./middleware/logger";
import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";

//currying = funkcia ktora vracia inu funkciu

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === "development" && logger, thunk].filter(Boolean);

const composedEnharcers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnharcers);

export const persistor = persistStore(store);
