import { dummyCart } from "@/types/static/cartDatas";
import CartSummary from "./cartSummary";
import { CartProvider } from "@/contexts/cartContext";

const CartSummaryPage = () => {
  return (
    <div className="w-auto h-screen">
      <CartProvider initialCart={dummyCart}>
        <CartSummary />
      </CartProvider>
    </div>
  );
};

export default CartSummaryPage;
