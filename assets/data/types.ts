export type MonsterKind = `Barroth` | `Pukei-Pukei` | `Jyuratodus` | `Diablos` | `Black Diablos`;
export const Monsters: MonsterKind[] = [
  `Barroth`,
  `Pukei-Pukei`,
  `Jyuratodus`,
  `Diablos`,
  `Black Diablos`,
];

export type RankType = `Low Rank` | `High Rank` | `Master Rank`;
export const Ranks: RankType[] = [`Low Rank`, `High Rank`, `Master Rank`];

export type Result = `Success` | `Failure`;

export type InventoryKind =
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
  | `hide`;

export type ItemEntry = {
  type: InventoryKind;
  name: string;
};
