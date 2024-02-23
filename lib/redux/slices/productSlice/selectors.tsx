import type { ReduxStateT } from '@/lib/redux'

export const selectProducts = (state: ReduxStateT) => state.product.products
export const selectBrands = (state: ReduxStateT) => state.product.brands
export const selectCategories = (state: ReduxStateT) => state.product.categories
export const statusProducts = (state: ReduxStateT) => state.product.status
export const totalCount = (state: ReduxStateT) => state.product.totalCount