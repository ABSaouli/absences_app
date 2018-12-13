// import { saveState, loadState } from "./localStorage";
// import throttle from "lodash/throttle";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/index";
import rootSaga from "./redux/saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  // const persistedState = loadState();
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, sagaMiddleware)
  );

  // store.subscribe(
  //   throttle(() => {
  //     saveState({
  //       absences: store.getState().absences
  //     });
  //   }, 1000)
  // );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
