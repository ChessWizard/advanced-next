import { UUID } from "crypto"
import { ProductModel } from "../product/productModels"

export type CartModel = {
   id: UUID,
   totalQuantity: number,
   totalPrice: number,
   totalGroupedQuantity: number,
   cartItems: CartItemModel[]  
}

export type CartItemModel = {
   id: UUID,
   quantity: number,
   isSelected: boolean,
   product: ProductModel
}

