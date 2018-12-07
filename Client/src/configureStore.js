// import { saveState, loadState } from "./localStorage";
// import throttle from "lodash/throttle";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers/index";

const configureStore = () => {
  // const persistedState = loadState();
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // store.subscribe(
  //   throttle(() => {
  //     saveState({
  //       absences: store.getState().absences
  //     });
  //   }, 1000)
  // );

  return store;
};

export default configureStore;
