import { ReduxStateT } from "@/lib/redux";

export const selectUserEmail = (state: ReduxStateT) => state.auth.email
export const selectUserToken = (state: ReduxStateT) => state.auth.token