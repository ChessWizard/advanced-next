"use client";

import { useCart } from "@/contexts/cartContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CartSummaryCard = () => {
  const CARGO_PRICE = 39.99;
  const FREE_SHIPPING_THRESHOLD = 300;
  const { cart } = useCart();
  const totalPrice = cart?.totalPrice || 0;

  return (
    <Card className="w-full md:w-64 lg:w-72 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Cart Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex text-sm mb-2">
          <div className="text-gray-500 mr-2">Total Price:</div>
          <div className="font-bold ml-auto">{formatPrice(totalPrice)}</div>
        </div>
        <div className="flex text-sm mb-2">
          <div className="text-gray-500 mr-2">Cargo Price:</div>
          <div className="font-bold ml-auto">
            {totalPrice === 0
              ? formatPrice(0)
              : formatPrice(CARGO_PRICE)}
          </div>
        </div>
        {totalPrice !== 0 && (
          <div className="flex text-sm mb-2">
            <div className="text-gray-500 mr-2 w-max">
              Free Shipping:
              <br />
              (Over 300₺ purchases)
            </div>
            <div className="font-bold ml-auto min-w-max text-seagreen">{`-${formatPrice(
              CARGO_PRICE
            )}`}</div>
          </div>
        )}

        <hr className="border border-spacing-0 shadow-black shadow-lg mb-5" />
        <div className="flex text-md mb-3">
          <div className="text-gray-500 mr-2 w-max">Total:</div>
          <div className="font-bold ml-auto min-w-max text-seagreen">
            {totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0
              ? formatPrice(totalPrice)
              : formatPrice(totalPrice + CARGO_PRICE)}
          </div>
        </div>
        <Button
          className="w-full
                  font-bold 
                  disabled:bg-black
                  disabled:opacity-80
                  disabled:cursor-not-allowed
                  hover:bg-seagreen/80"
        >
          Confirm Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummaryCard;
