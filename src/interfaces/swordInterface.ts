import {Item, ItemType} from './itemInterface';

export interface Sword extends Item {
    type: ItemType.SWORD;
    material: SwordMaterial;
}

export enum SwordMaterial {
    SILVER = 'silver',
    STEEL = 'steel'
}