import {Item, ItemType} from './itemInterface';

export interface Decoction extends Item {
    type: ItemType.DECOCTION;
    ingredients: string;
    duration: string;
    toxicity: number;
}