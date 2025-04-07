import { MenuModel, MenuItemModel } from "@/types/common/menuModels";
import { ShoppingCart } from 'lucide-react';

// Homepage
const homePageMenuItems: MenuItemModel[] = [
    {
        title: "Routing",
        description: "State management in Next.js helps coordinate shared data across components.",
        image: "/images/menu/routing.png",
        link: "/routing"
    },
    {
        title: "State Management",
        description: "State management in Next.js helps coordinate shared data across components.",
        image: "/images/menu/state-management.png",
        link: "/state-management"
    },
]

export const homePageMenu: MenuModel = {
    title: "Topics",
    items: homePageMenuItems
}

// State Management
const stateManagementItems: MenuItemModel[] = [
    {
        title: "Context API",
        description: "Context API in React shares state globally without prop drilling.",
        image: "/images/menu/context-api.png",
        link: "/state-management/context-api"
    },
]

export const stateManagementMenu: MenuModel = {
    title: "State Management",
    items: stateManagementItems
}

// State Management -> Context Api
const contextApiItems: MenuItemModel[] = [
    {
        title: "Cart Summary",
        description: "Cart summary built using Context API for global state sharing.",
        image: <ShoppingCart className="w-[150px] h-[150px] object-contain transition-all duration-500 p-10 
        md:w-[180px] md:h-[180px]
        lg:w-[200px] lg:h-[200px]" />,
        link: "/state-management/context-api?example=cart-summary"
    },
]

export const contextApiMenu: MenuModel = {
    title: "Context API",
    items: contextApiItems
}



