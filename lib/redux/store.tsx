import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

import { reducer } from "./rootReducer";

export const reduxStore = configureStore({
  reducer,
});

export const useDispatch = () => useReduxDispatch<ReduxDispatchT>();
export const useSelector: TypedUseSelectorHook<ReduxStateT> = useReduxSelector;

/* Types */
export type ReduxStoreT = typeof reduxStore;
export type ReduxStateT = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatchT = typeof reduxStore.dispatch;
export type ReduxThunkActionT<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxStateT,
  unknown,
  Action
>;
