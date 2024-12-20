export interface Item {
    id: string;
    name: string;
    description: string;
    type: ItemType;
}

export enum ItemType {
    SWORD = 'sword',
    OIL = 'oil',
    DECOCTION = 'decoction'
}
