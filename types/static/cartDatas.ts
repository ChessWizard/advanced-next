import { CartItemModel, CartModel } from "../cart/cartModels";
import { products } from "./productDatas";

const cartItems: CartItemModel[] = [
  {
    id: "33333333-3333-3333-3333-333333333331",
    quantity: 2,
    isSelected: true,
    product: products[0],
  },
  {
    id: "33333333-3333-3333-3333-333333333332",
    quantity: 3,
    isSelected: false,
    product: products[1],
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    quantity: 1,
    isSelected: true,
    product: products[2],
  },
  {
    id: "33333333-3333-3333-3333-333333333334",
    quantity: 5,
    isSelected: false,
    product: products[3],
  },
  {
    id: "33333333-3333-3333-3333-333333333335",
    quantity: 4,
    isSelected: true,
    product: products[4],
  },
];

const processableCartItems = cartItems.filter(item => item.isSelected)

export const dummyCart: CartModel = {
  id: "11111111-1111-1111-1111-111111111111",
  totalQuantity: processableCartItems.reduce((currentSum, item) => currentSum + item.quantity, 0),
  totalPrice: processableCartItems.reduce((currentSum, item) => currentSum + item.quantity * (item.product.price || 0), 0),
  totalGroupedQuantity: processableCartItems.length,
  cartItems: cartItems,
};
