import Menu from "@/components/common/menu/menu";
import CartSummaryPage from "@/components/state-management/context-api/cart-summary/cartSummaryPage";
import { ContextApiExampleConstants } from "@/constants/stateManagementConstants";
import { contextApiMenu } from "@/types/static/menuDatas";
import { notFound } from "next/navigation";

const ContextApiPage = async (props: {
    searchParams: Promise<{example: string}>
}) => {

    const { example } = await props.searchParams

    if(!example){
        return (
            <Menu data={contextApiMenu} />
        )
    }

    switch (example) {
        case ContextApiExampleConstants.CART_SUMMARY:
            return <CartSummaryPage />
    
        default:
            return notFound()
    }
}
 
export default ContextApiPage;