import { takeLatest, all, call, put } from "redux-saga/effects";
//all - prijma pole funkcii a caka az kym sa vsetky vykonaju
//takeLatest - ak sa opakuje nejaka akcia viac krat za sebou zobere jej poslednu hodnotu
//call - ak chceme volat funkciu 1 arg funkcia, dalsi su parametre
//put - namiesto dispatch
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
