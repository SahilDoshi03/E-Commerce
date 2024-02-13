import { configureStore } from '@reduxjs/toolkit'

export const reduxStore = configureStore({
    reducer: {}
})

export type ReduxStateT = ReturnType<typeof reduxStore.getState>
export type ReduxDispatchT = typeof reduxStore.dispatch