import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";
import { userSaga } from "./user/user.saga";

//ES6 generator saga
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSaga)]);
}
