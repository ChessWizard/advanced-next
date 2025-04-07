import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItemModel } from "@/types/cart/cartModels";
import CartItemCardContent from "./cartItemCardContent";

const CartItemCardContainer = (
    { 
        brand,
        items 
    }: 
    { 
        brand: string,
        items: CartItemModel[] 
    }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            
            <label
              htmlFor={brand}
              className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-none"
            >
              <span className="font-medium opacity-60">Sales Brand:{"  "}</span>
              <span className="font-bold">{brand}</span>
            </label>
          </CardTitle>
        </CardHeader>
        <hr className="border border-spacing-0 shadow-black shadow-lg" />
        {items.map((item: CartItemModel) => (
            <CartItemCardContent data={item} key={item.id} />
        ))}
      </Card>
    </>
  );
};

export default CartItemCardContainer;
