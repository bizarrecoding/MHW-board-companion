---
name: create-monster
description: Create a new monster by extending the monster data framework with all required files and registrations
---

# Create Monster

This skill creates a new monster for the MHW Board Companion app by generating all required data files and registering them across the codebase.

## When to use

When the user wants to add a new monster to the game (e.g., "add Rathalos", "create a new monster", "extend the monster roster").

## Monster Framework Overview

Each monster lives in `assets/data/<snake_case_name>/` and consists of:
- `index.ts` — module aggregator
- `hunt.ts` — HP, body parts, defenses, break thresholds, weaknesses per rank
- `behavior.ts` — attack behavior cards (movements, damage, range, dodge, etc.)
- `rewards.ts` — loot table for rolls and part breaks
- `story.ts` — story mode entries (can be empty `[]`)
- `items.ts` — item definitions for the inventory system

The monster must also be registered in:
- `assets/data/types.ts` — `MonsterKind` type and `Monsters` array
- `assets/data/behaviors.ts` — `BehaviorData` record
- `assets/data/hunt.ts` — `MonsterHuntData` record
- `assets/data/story.ts` — `story` record
- `assets/data/rewards.ts` — `rewards` object
- `assets/data/items.ts` — `ItemList` spread
- `assets/data/palette.ts` — color mapping

The monster image should be placed in: 
- `assets/images/monster/MHW-<MonsterName>_Icon.png`  

The monster image is imported then registered in: 
- `components/InventoryIcon.tsx` -  case in MonsterIconBG

## Instructions

### Step 1: Gather monster details

Ask the user for:
1. **Monster name** (e.g., "Rathalos", "Nergigante") — this is the display name used in `MonsterKind`
2. **Snake case name** (e.g., "rathalos", "nergigante") — used for folder/file names
3. **Monster color** (hex, e.g., `#CC3333`) — for UI theming
4. **Rank data** (Low/High/Master): maxHP, part defenses, break thresholds, weaknesses
5. **Behaviors** — list of attacks with stats (name, part, effect, movement, area, target, damage, range, dodge, actions, turns)
6. **Rewards** — roll table (1-12) and part break rewards (Head, Arms, Tail)
7. **Items** — drop items with type and category

If the user doesn't have all details, create the structure with placeholder values they can fill in later.

### Step 2: Create monster folder and files

Create `assets/data/<snake_case_name>/` with these files:

**`index.ts`**
```ts
import behavior from "./behavior";
import hunt from "./hunt";
import story from "./story";
import rewards from "./rewards";
import items from "./items";

export default {
  behavior,
  hunt,
  story,
  rewards,
  items,
};
```

**`hunt.ts`** — Use this template:
```ts
const monsterHunt = {
  "Low Rank": {
    maxHP: 60,
    parts: {
      Head: { def: 0, breakRes: 3 },
      Back: { def: 0, breakRes: 0 },
      Legs: { def: 1, breakRes: 3 },
      Tail: { def: 1, breakRes: 4 },
    },
    effects: ""
  },
  "High Rank": {
    maxHP: 65,
    parts: {
      Head: { def: 1, breakRes: 4 },
      Back: { def: 0, breakRes: 0 },
      Legs: { def: 2, breakRes: 4 },
      Tail: { def: 1, breakRes: 5 },
    },
    effects: ""
  },
  "Master Rank": {
    maxHP: 70,
    parts: {
      Head: { def: 2, breakRes: 5 },
      Back: { def: 0, breakRes: 0 },
      Legs: { def: 3, breakRes: 5 },
      Tail: { def: 2, breakRes: 6 },
    },
    effects: ""
  },
  effects: "",
  weakness: {
    Fire: 1,
    Water: 1,
    Thunder: 1,
    Ice: 1,
    Dragon: 1,
    Paralysis: 1,
    Poison: 1,
    Sleep: 1,
    Blast: 1,
    Stun: 1,
  },
}

export default monsterHunt
```

**`behavior.ts`** — Use this template (import `Behavior` from `../types`):
```ts
import { Behavior } from "../types"

const Behaviors: Behavior[] = [
  // Add behavior entries here
  // Example:
  // {
  //   name: "Attack Name",
  //   part: "Head",        // "Head" | "Back" | "Legs" | "Tail"
  //   effect: null,        // Elements | Ailments | null
  //   movement: [2, "Front"],  // [distance, Direction | null]
  //   area: ["Front"],     // Direction[]
  //   target: "Melee",     // "Melee" | "Ranged"
  //   damage: 8,
  //   range: 2,
  //   dodge: 4,
  //   actions: 2,
  //   turns: 3
  // },
]
export default Behaviors
```

**`rewards.ts`** — Use this template:
```ts
const rewards = {
  "1": "Monster Bone M",
  "2": "Monster Material",
  "3": "Monster Scale",
  "4": "Monster Shell",
  "5": "Monster Wing",
  "6": "Monster Sac",
  "7": "Monster Tail",
  "8": "Rare Material",
  "9": "Monster Wing",
  "10": "Monster Scale",
  "11": "Monster Shell",
  "12": "Monster Bone M",
  Head: "Monster Sac",
  Arms: "Monster Wing",
  Tail: "Monster Tail",
}

export default rewards
```

**`story.ts`** — Use this template:
```ts
import { StoryEntry } from "../types"

const story: StoryEntry[] = []

export default story;
```

**`items.ts`** — Use this template (import `ItemEntry` from `../types`):
```ts
import { ItemEntry } from "../types";

const items: ItemEntry[] = [
  // Add item entries here
  // Example:
  // {
  //   type: "scale",         // InventoryKind
  //   name: "Monster Scale",
  //   category: "monster-name"
  // },
];

export default items;
```

### Step 3: Register monster in types.ts

Edit `assets/data/types.ts`:

1. Add the monster name to `MonsterKind` type (use backtick template literal syntax):
```ts
export type MonsterKind = `Barroth` | `Pukei-Pukei` | `Jyuratodus` | `Diablos` | `Black Diablos` | `Brachydios` | `New Monster`;
```

2. Add to `Monsters` array:
```ts
export const Monsters: MonsterKind[] = [
  `Barroth`,
  `Pukei-Pukei`,
  `Jyuratodus`,
  `Diablos`,
  `Black Diablos`,
  `Brachydios`,
  `New Monster`
];
```

### Step 4: Register in aggregation files

**`assets/data/behaviors.ts`** — Add import and entry:
```ts
import new_monster from "./new_monster";
// ...
export const BehaviorData: Record<MonsterKind, (Behavior|null)[] | null> = {
  // ...existing entries
  "New Monster": new_monster.behavior,
}
```

**`assets/data/hunt.ts`** — Add import and entry:
```ts
import new_monster from "./new_monster";
// ...
export const MonsterHuntData: MonsterData = {
  // ...existing entries
  "New Monster": new_monster.hunt,
}
```

**`assets/data/story.ts`** — Add import and entry:
```ts
import new_monster from "./new_monster";
// ...
export const story: Record<MonsterKind, StoryEntry[]> = {
  // ...existing entries
  "New Monster": new_monster.story,
};
```

**`assets/data/rewards.ts`** — Add import and entry:
```ts
import new_monster from "./new_monster";
// ...
export const rewards = {
  // ...existing entries
  "New Monster": new_monster.rewards
};
```

**`assets/data/items.ts`** — Add import and spread:
```ts
import new_monster from "./new_monster";
// ...
export const ItemList: ItemEntry[] = [
  // ...existing spreads
  ...new_monster.items,
  // ...common items
];
```

### Step 5: Add color to palette

Edit `assets/data/palette.ts`:
```ts
const ColorMap: Record<string, string> = {
  // ...existing entries
  "New Monster": "#HEXCOLOR",
}
```

### Step 6: add image and register 

Edit `components/InventoryIcon.tsx`
```ts

const Brachydios = require(`../assets/images/monster/MHW-Brachydios_Icon.png`);
const Rathalos = require(`../assets/images/monster/MHW-Rathalos_Icon.webp`);
...
const MonsterName = require(`../assets/images/monster/MHW-MonsterName_Icon.webp`);
...
const MonsterIconBG: React.FC<MonsterIconProps> = ({ type, style, disabled }) => {
  ...
  switch (type) {
    case `Rathalos`:
      return <Image style={iconStyles} resizeMode="contain" source={Rathalos} />;
    ...
    case `New Monster`:
      return <Image style={iconStyles} resizeMode="contain" source={NewMonster} />;
    ...
  }
}
```

### Step 7: Verify

Run `yarn check-types` to ensure no type errors. The new monster should now appear in the settings screen and be selectable throughout the app.
