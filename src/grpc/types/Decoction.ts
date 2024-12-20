import {Item} from "./Item";

export type Decoction = Item & {
    type: 'decoction';
    ingredients: string;
    duration: string;
    toxicity: number;
};