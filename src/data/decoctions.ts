import { Decoction } from '../interfaces/decoctionInterface';
import { ItemType } from '../interfaces/itemInterface';

export const decoctions: (Decoction)[] = [
    {
        id: 1,
        name: 'Basilisk decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Basilisk mutagen, 1 × Blowball, 1 × Fool\'s parsley leaves, 1 × Beggartick blossoms',
        description: 'Applies a buff increasing the intensity of a randomly selected Sign at dusk and dawn. Lasts longer than other mutagen decoctions.',
        duration: '5760s',
        toxicity: 40
    },
    {
        id: 2,
        name: 'Leshen decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Leshen mutagen, 1 × Moleyarrow, 1 × Pringrape',
        description: 'A portion of the damage dealt by enemies is reflected back on the attacker. 10 Damage returned, 10% Damage returned',
        duration: '1800s',
        toxicity: 70
    },
    {
        id: 3,
        name: 'Alghoul decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 5 × Lesser red mutagen, 1 × Alghoul bone marrow, 1 × Buckthorn',
        description: 'Adrenaline Points are generated more quickly than normal until the first successful enemy attack. 50% Adrenaline Point gain',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 4,
        name: 'Ancient leshen decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Ancient leshen mutagen, 1 × Mandrake root, 1 × Ginatia petals, 1 × Honeysuckle',
        description: 'Each Sign cast increases Stamina regeneration for the remainder of the fight. 2 Stamina regeneration in combat',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 5,
        name: 'Arachas decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Arachas mutagen, 1 × White myrtle petals',
        description: 'Reduces damage received based on armor and inventory weight: less weight carried and lighter armor means less damage is taken.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 6,
        name: 'Archgriffin decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Archgriffin mutagen, 1 × Ribleaf, 1 × Blowball',
        description: 'If any Stamina is available, strong attacks consume all of it and reduce the struck foe\'s Vitality by 5% after their normal damage is calculated.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 7,
        name: 'Chort decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Chort mutagen, 1 × Puffball, 1 × Cortinarius',
        description: 'Provides complete resistance to the Stagger description and reduces the Knock-down description to Stagger.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 8,
        name: 'Cockatrice decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Cockatrice mutagen, 1 × Crow\'s eye',
        description: 'All alchemy creations can be used one additional time.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 9,
        name: 'Doppler decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Doppler mutagen, 1 × Han fiber, 1 × Longrube',
        description: 'Increases critical hit damage when attacking from behind. 50% Increased damage',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 10,
        name: 'Earth elemental decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Earth elemental mutagen, 1 × Balisse fruit, 1 × Pringrape',
        description: 'Increases the witcher\'s resistance to Vitality-depleting critical effects applied during combat. The resistance level rises the longer the critical description is applied.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 11,
        name: 'Ekhidna decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Ekhidna mutagen, 1 × Ribleaf, 1 × Berbercane fruit',
        description: 'Performing actions that consume Stamina regenerates Vitality.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 12,
        name: 'Ekimmara decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Ekimmara mutagen, 1 × White myrtle petals, 1 × Mandrake root',
        description: 'Damage dealt to foes regenerates Vitality. 10% Vitality drain',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 13,
        name: 'Fiend decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Fiend mutagen, 1 × Hellebore petals, 1 × Fool\'s parsley leaves, 1 × Arenaria',
        description: 'Increases the amount of weight the witcher can carry without being overburdened. 20 Maximum inventory weight',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 14,
        name: 'Foglet decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Foglet mutagen, 1 × Fool\'s parsley leaves, 1 × Blowball',
        description: 'Increases Sign Intensity during cloudy weather. 25% Sign intensity',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 15,
        name: 'Grave hag decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Grave hag mutagen, 1 × Ginatia petals, 1 × Honeysuckle',
        description: 'Increases Vitality for each foe slain. The bonus lasts until the player meditates or fast travels.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 16,
        name: 'Griffin decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Griffin mutagen, 1 × Berbercane fruit, 1 × Balisse fruit',
        description: 'Increases Sign Intensity for the remainder of the fight whenever a Sign is cast. Stamina regeneration in combat increases as well.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 17,
        name: 'Katakan decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Katakan mutagen, 1 × Crow\'s eye, 1 × Cortinarius',
        description: 'Increases critical hit chance. 15% Critical hit chance',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 18,
        name: 'Nekker decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Nekker mutagen, 1 × Fool\'s parsley leaves, 1 × White myrtle petals',
        description: 'Each foe slain accelerates Vitality regeneration for the duration of the battle.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 19,
        name: 'Nightwraith decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Nightwraith mutagen, 1 × Blowball, 1 × Ginatia petals',
        description: 'Increases Stamina regeneration at night. 50% Stamina regeneration',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 20,
        name: 'Noonwraith decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Noonwraith mutagen, 1 × Hellebore petals, 1 × Mandrake root',
        description: 'Reduces damage received from monsters during the day. 10% Reduced damage',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 21,
        name: 'Succubus decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Succubus mutagen, 1 × White myrtle petals, 1 × Arenaria',
        description: 'Damage dealt to enemies regenerates Stamina. 2% Stamina regeneration',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 22,
        name: 'Troll decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Troll mutagen, 1 × Longrube, 1 × Pringrape',
        description: 'Regenerates Vitality during and outside of combat. 5% Vitality regeneration',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 23,
        name: 'Wraith decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Wraith mutagen, 1 × Moleyarrow, 1 × Cortinarius',
        description: 'Damaged dealt increases when Vitality is at its maximum. 5% Increased damage',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 24,
        name: 'Wyvern decoction',
        type: ItemType.DECOCTION,
        ingredients: '1 × Dwarven spirit, 1 × Wyvern mutagen, 1 × Han fiber, 1 × Berbercane fruit',
        description: 'Increases Attack Power for each blow landed until the fight ends or damage (other than damage dealt by Toxicity) is taken.',
        duration: '1800s',
        toxicity: 50
    },
    {
        id: 25,
        name: 'The Decoctions of the Grasses',
        type: ItemType.DECOCTION,
        ingredients: '1 × Forktail spinal fluid, 1 × Manticore poison gland, 1 × Albino bruxa tongue, 1 × Bryonia, 1 × Ribleaf, 1 × Mandrake',
        description: 'Long duration and very big toxicity. The Decoctions of the Grasses were used to make new witchers. Only a few can survive this',
        duration: 'few days',
        toxicity: 99999
    }
];