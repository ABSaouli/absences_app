// import { saveState, loadState } from "./localStorage";
// import throttle from "lodash/throttle";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/index";

const configureStore = () => {
  // const persistedState = loadState();
  const store = createStore(rootReducer, applyMiddleware(thunk));

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
