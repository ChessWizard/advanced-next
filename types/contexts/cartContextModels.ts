import { CartModel } from "../cart/cartModels"

export type CartContextModel = {
    cart: CartModel | null
    updateCart: (newCart: CartModel) => void
}