import {Item} from "./Item";

export type Sword = Item & {
    type: 'sword';
    material: 'silver' | 'steel';
};