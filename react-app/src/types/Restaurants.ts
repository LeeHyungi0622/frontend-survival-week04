import { Food } from "./Food"

export type Restaurant = {
    id: string,
    category: string,
    name: string,
    menu: Food[]
}