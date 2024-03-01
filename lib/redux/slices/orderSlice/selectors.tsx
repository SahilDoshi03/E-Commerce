import type { ReduxStateT } from '@/lib/redux'

export const selectOrder = (state: ReduxStateT) => state.order.orders
export const selectOrderStatus = (state: ReduxStateT) => state.order.status