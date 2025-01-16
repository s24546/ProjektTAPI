export interface Item {
    id: number;
    name: string;
    description: string;
    type: ItemType;
}

export enum ItemType {
    SWORD = 'sword',
    OIL = 'oil',
    DECOCTION = 'decoction'
}
