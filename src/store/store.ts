import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "./middleware/logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";
//currying = funkcia ktora vracia inu funkciu

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type RootState = ReturnType<typeof rootReducer>;

//mali by sme pouzivat iba jednu async-redux kniznicu v 1 projekte cize bud thunk alebo saga ...

type ExtendedPersistConfit = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfit = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === "development" && logger, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnchancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnharcers = composeEnchancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnharcers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
