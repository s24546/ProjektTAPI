import {Item} from "./Item";

export type Oil = Item & {
    type: 'oil';
    ingredients: string;
    charges: number,
};
