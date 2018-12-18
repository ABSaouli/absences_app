import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/index";
import rootSaga from "./redux/saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers
      ? composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
      : applyMiddleware(thunk, sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
