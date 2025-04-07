import { cn } from "@/lib/utils";

const ProductPrice = ({
    value,
    className
}: {value: number;
    className?: string;
}) => {

    const displayedPrice = value.toFixed(2)
    const [absolute, odd] = displayedPrice.split('.')

    return ( 
        <p className={cn('text-lg', 'font-bold', className)}>
            <span className="text-sm align-super">₺</span>
            {absolute}
            <span className="text-xs align-super">,{odd}</span>
        </p>
     );
}
 
export default ProductPrice;