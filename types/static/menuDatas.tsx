import { MenuModel, MenuItemModel } from "@/types/common/menuModels";
import { ShoppingCart, Diff } from 'lucide-react';

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
    {
        title: "useState() Hook",
        description: "useState() Hook in React shares state locally within a component for basic state management.",
        image: "/images/menu/use-state.png",
        link: "/state-management/use-state"
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
        image: <ShoppingCart className="object-contain transition-all duration-500 p-10 
                   w-[180px] h-[180px]
                   md:w-[260px] md:h-[260px] 
                   lg:w-[240px] lg:h-[240px]" />,
        link: "/state-management/context-api?example=cart-summary"
    },
]

export const contextApiMenu: MenuModel = {
    title: "Context API",
    items: contextApiItems
}

// State Management -> useState() Hook
const useStateItems: MenuItemModel[] = [
    {
        title: "Counter Game",
        description: "Counter game built using useState() hook.",
        image: <Diff className="object-contain transition-all duration-500 p-10 
                   w-[180px] h-[180px]
                   md:w-[260px] md:h-[260px] 
                   lg:w-[240px] lg:h-[240px]" />,
        link: "/state-management/use-state?example=counter-game"
    },
]

export const useStateMenu: MenuModel = {
    title: "useState() Hook",
    items: useStateItems
}



