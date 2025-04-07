import { UUID } from "crypto"

export type ProductModel = {
    id: UUID,
    name: string,
    brand: string,
    description: string,
    image: string,
    price: number
}