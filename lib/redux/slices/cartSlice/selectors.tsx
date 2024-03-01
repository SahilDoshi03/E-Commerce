import type { ReduxStateT } from '@/lib/redux'

export const selectCart = (state: ReduxStateT) => state.cart.cart
export const selectCartStatus = (state: ReduxStateT) => state.cart.status