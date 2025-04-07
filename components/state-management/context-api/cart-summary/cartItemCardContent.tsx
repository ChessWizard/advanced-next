"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Loader, Minus, Plus, Trash } from "lucide-react";
import { CartItemModel } from "@/types/cart/cartModels";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ProductPrice from "./productPrice";
import { useCart } from "@/contexts/cartContext";

const CartItemCardContent = ({ data }: { data: CartItemModel }) => {
  const cartItemId = data.id;
  const product = data.product;
  const productName = product.name;
  const brandName = product.brand;
  const productDescription = product.description;
  const productImage = product.image;
  const isSelected = data.isSelected;
  const cartItemQuantity = data.quantity;
  const price = product.price;

  const [isCartItemSelected, setIsCartItemSelected] = useState(isSelected);
  const [isQuantityPending, startQuantityTransition] = useTransition();
  const [quantity, setQuantity] = useState(cartItemQuantity);
  const [isSelectPending, startSelectQuantityTransition] = useTransition();
  const [isRemovePending, startRemoveTransition] = useTransition();
  const { cart, updateCart } = useCart();

  const updateCartSelectedState = (isSelected: boolean) => {
    if (!cart) return;

    const updatedCartItems = cart?.cartItems.map((item) => {
      if (item.id === cartItemId) {
        return {
          ...item,
          isSelected: isSelected,
        };
      }

      return item;
    });

    const { totalPrice, totalQuantity, totalGroupedQuantity } =
      calculateCartStats(updatedCartItems);

    updateCart({
      ...cart,
      cartItems: updatedCartItems,
      totalPrice,
      totalQuantity,
      totalGroupedQuantity,
    });
  };

  const updateCartQuantityState = (newQuantity: number) => {
    if (!cart) return;

    const updatedCartItems = cart.cartItems.map((item) => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    const { totalPrice, totalQuantity, totalGroupedQuantity } =
      calculateCartStats(updatedCartItems);

    updateCart({
      ...cart,
      cartItems: updatedCartItems,
      totalPrice,
      totalQuantity,
      totalGroupedQuantity,
    });
  };

  const removeCartItem = () => {
    if (!cart) return;

    const updatedCartItems = cart?.cartItems.filter(
      (cartItem) => cartItem.id !== cartItemId
    );

    const { totalPrice, totalQuantity, totalGroupedQuantity } =
      calculateCartStats(updatedCartItems);

    updateCart({
      ...cart,
      cartItems: updatedCartItems,
      totalPrice,
      totalQuantity,
      totalGroupedQuantity,
    });
  };

  const calculateCartStats = (
    updatedCartItems: CartItemModel[]
  ): {
    totalQuantity: number;
    totalPrice: number;
    totalGroupedQuantity: number;
  } => {
    const processableCartItems = updatedCartItems.filter(
      (item) => item.isSelected
    );
    const totalQuantity = processableCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice = processableCartItems.reduce(
      (sum, item) => sum + item.quantity * (item.product.price || 0),
      0
    );
    const totalGroupedQuantity = processableCartItems.length;

    return { totalQuantity, totalPrice, totalGroupedQuantity };
  };

  return (
    <>
      <CardContent className="flex items-center gap-3 py-10 px-3">
        {isSelectPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Checkbox
            id={`${productName}`}
            className="data-[state=checked]:bg-green-500 border-[bg-green-500]"
            checked={isCartItemSelected}
            onCheckedChange={async (checked) =>
              startSelectQuantityTransition(async () => {
                const checkStatus = checked.valueOf() as boolean;

                // api call simulation
                await new Promise((resolve) => setTimeout(resolve, 300));
                setIsCartItemSelected(checkStatus);
                updateCartSelectedState(checkStatus);
              })
            }
          />
        )}
        <Image
          src={productImage}
          priority={true}
          alt={productName}
          width={80}
          height={120}
          className="rounded-xl min-w-[70px] min-h-[100px] 
                              md:min-w-[80px] md:min-h-[120px]"
        />

        <div
          className="grid grid-cols-1 gap-5
                        lg:grid-cols-2"
        >
          <div className="card-details">
            <div
              className="grid grid-cols-1 items-center gap-2
                                    md:[grid-template-columns:auto_1fr]"
            >
              <span
                className="text-xs font-bold
                                         md:text-sm"
              >
                {brandName}{" "}
              </span>
              <p
                className="text-xs font-medium h-auto overflow-hidden text-ellipsis whitespace-nowrap max-w-[350px]
                                        md:max-w-[600px] md:text-sm
                                        lg:max-w-[500px] "
              >
                {productDescription}
              </p>
            </div>
          </div>

          <div className="plusMinusButtons">
            <div className="flex items-center justify-center gap-2">
              <Button
                disabled={isQuantityPending || quantity == 1}
                variant="outline"
                type="button"
                className="w-6 h-6 md:w-8 md:h-8"
                onClick={() =>
                  startQuantityTransition(async () => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setQuantity(quantity - 1);
                    updateCartQuantityState(quantity - 1);
                  })
                }
              >
                {isQuantityPending ? (
                  <Loader className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                ) : (
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </Button>
              <span className="px-2 md:px-3 text-sm md:text-base">
                {quantity}
              </span>
              <Button
                disabled={isQuantityPending}
                variant="outline"
                type="button"
                className="w-6 h-6 md:w-8 md:h-8"
                onClick={() =>
                  startQuantityTransition(async () => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setQuantity(quantity + 1);
                    updateCartQuantityState(quantity + 1);
                  })
                }
              >
                {isQuantityPending ? (
                  <Loader className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                ) : (
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <div
            className="flex items-center gap-3 mb-5 cursor-pointer"
            onClick={() => {
              startRemoveTransition(async () => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                removeCartItem();
              });
            }}
          >
            {isRemovePending ? (
              <Loader className="w-3 h-3 md:w-4 md:h-4 animate-spin m-auto" />
            ) : (
              <>
                <Trash className="m-auto" size={20} />
                <span className="text-xs hidden md:block">Remove</span>
              </>
            )}
          </div>
          <ProductPrice
            value={price * quantity}
            className="text-sm text-seagreen 
                                  md:text-lg"
          />
        </div>
      </CardContent>
    </>
  );
};

export default CartItemCardContent;
