"use client"

import { CartModel } from "@/types/cart/cartModels"
import { CartContextModel } from "@/types/contexts/cartContextModels"
import { createContext, useContext, useState, ReactNode } from "react"

const CartContext = createContext<CartContextModel | undefined>(undefined)

export function CartProvider({children, initialCart}:
    {
        children: ReactNode
        initialCart: CartModel
    }
){
    const [cart, setCart] = useState<CartModel>(initialCart)

    const updateCart = (newCart: CartModel) => {
        setCart(newCart)
    }

    return (
        <CartContext.Provider value={{cart, updateCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {

    const cartContext = useContext(CartContext)
    if(!cartContext)
        throw new Error("useCart context must be used within a CartProvider")

    return cartContext
}