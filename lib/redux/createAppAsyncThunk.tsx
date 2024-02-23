import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReduxStateT, ReduxDispatchT } from "./store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: ReduxStateT;
  dispatch: ReduxDispatchT;
  rejectValue: string;
}>();
