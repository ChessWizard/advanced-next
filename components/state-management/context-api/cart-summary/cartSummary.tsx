"use client";

import { Metadata } from "next";
import { useCart } from "@/contexts/cartContext";
import CartTable from "./cartTable";
import CartSummaryCard from "./cartSummaryCard";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartSummary = () => {
  const { cart } = useCart();

  if (!cart || cart.cartItems.length == 0) {
    return (
      <>
        <Card className="p-5 w-100 m-auto">
          <CardContent
            className="flex items-center p-0 gap-3
                                          md:gap-4"
          >
            <ShoppingCart size={33} />
            <div
              className="text-xs font-bold whitespace-nowrap
                                      sm:text-sm 
                                      md:h3-bold"
            >
              Your cart is empty.
            </div>
            <Button className="ml-auto w-max">
              <Link href={"/state-management/context-api"}>Go Context API</Link>
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4">
          <CartTable />
          <div className="cartSummary mt-5 col-span-1 md:col-span-2 lg:col-span-2">
            <div className="sticky top-4">
              <CartSummaryCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;

export const metadata: Metadata = {
  title: "Shopping Cart",
};
