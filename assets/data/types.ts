
export type Elements = `Fire` | `Water` | `Thunder` | `Ice` | `Dragon`;
export type Ailments = `Paralysis` | `Poison` | `Sleep` | `Blast` | `Stun`;
export type MonsterKind = `Barroth` | `Pukei-Pukei` | `Jyuratodus` | `Diablos` | `Black Diablos` | `Brachydios`;

export const Monsters: MonsterKind[] = [
  `Barroth`,
  `Pukei-Pukei`,
  `Jyuratodus`,
  `Diablos`,
  `Black Diablos`,
  `Brachydios`
];

export type RankType = `Low Rank` | `High Rank` | `Master Rank`;
export const Ranks: RankType[] = [`Low Rank`, `High Rank`, `Master Rank`];

export type Result = `Success` | `Failure`;

export type InventoryKind =
  | `potion`
  | `ore`
  | `shell`
  | `bone`
  | `wing`
  | `sac`
  | `mud`
  | `scale`
  | `gem`
  | `tail`
  | `claw`
  | `ridge`
  | `hide`
  | `head`;

export type ItemEntry = {
  type: InventoryKind;
  name: string;
};

export type StoryOption = {
  text: string,
  effect?: string[],
  condition?: string,
  get?: string[],
  roll?: string[],
  next: number
}
export type StoryEntry = {
  entry: number,
  content: string,
  options?: StoryOption[],
  get?: string[],
  roll?: string[]
  monster?: MonsterKind
}

export type Direction = "Front" | "Back" | "Left" | "Right";
export type Behavior = {
  name: string;
  rank?: RankType;
  part: "Head" | "Back" | "Legs" | "Tail";
  effect: Elements | Ailments | null;
  movement: [number, Direction | null];
  area: Direction[];
  target: "Melee" | "Ranged";
  damage: number;
  range: number;
  dodge: number;
  actions: number;
  turns: number;
}
