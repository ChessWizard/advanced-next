import Menu from "@/components/common/menu/menu";
import { stateManagementMenu } from "@/types/static/menu";

const StateManagementPage = () => {
    return ( 
        <>
            <Menu data={stateManagementMenu} />
        </>
     );
}
 
export default StateManagementPage;