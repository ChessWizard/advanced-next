import Menu from "@/components/common/menu/menu"
import { UseStateExampleConstants } from "@/constants/stateManagementConstants"
import { useStateMenu } from "@/types/static/menuDatas"
import CounterGamePage from "@/components/state-management/use-state/counter-game/counterGamePage"
import { notFound } from "next/navigation"

const UseStatePage = async (props: {
    searchParams: Promise<{example: string}>
}) => {
    
    const { example } = await props.searchParams

    if(!example){
        return (
            <Menu data={useStateMenu} />
        )
    }

    switch (example) {
        case UseStateExampleConstants.COUNTER_GAME:
            return <CounterGamePage />
    
        default:
            return notFound()
    }
}
 
export default UseStatePage;