import { ReactNode } from "react"

export type MenuModel = {
    title: string,
    items: MenuItemModel[]
}

export type MenuItemModel = {
    title: string,
    description: string,
    image: string | ReactNode,
    link: string
}