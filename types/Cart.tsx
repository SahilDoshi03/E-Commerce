import type { Product } from "./Product"

type CartItem = {
    _id: string
    quantity: number
    user: string
    product: Product
}

export type { CartItem }