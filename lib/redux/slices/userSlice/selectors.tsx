import { ReduxStateT } from "@/lib/redux";

export const selectUser = (state: ReduxStateT) => state.user.user;
export const selectUserStatus = (state: ReduxStateT) => state.user.status;
