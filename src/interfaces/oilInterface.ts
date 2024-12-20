import {Item, ItemType} from './itemInterface';

export interface Oil extends Item {
    type: ItemType.OIL;
    ingredients: string;
    charges: number;
}