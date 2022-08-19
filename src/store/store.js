import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "./middleware/logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";
//currying = funkcia ktora vracia inu funkciu

//mali by sme pouzivat iba jednu async-redux kniznicu v 1 projekte cize bud thunk alebo saga ...

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === "development" && logger, sagaMiddleware].filter(Boolean);

const composedEnharcers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnharcers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
