import { Ailments,Elements } from "../../components/monster/ResistanceIcon";
import { MonsterKind, RankType } from "./types"

export type PartsData =  Record<"Head"|"Back"|"Legs"|"Tail", { def: number; breakRes: number; effect?: string }>

type HuntData = {
  maxHP: number
  parts:PartsData
}
type RankData = Record<RankType, HuntData | null> & {
  effects?: string
  weakness: Record<Elements|Ailments, number>
}
type MonsterData = Record<MonsterKind, RankData | null>

export const MonsterHuntData: MonsterData = {
  Barroth: {
    "Low Rank": {
      maxHP: 50,
      parts: {
        Head: { def: 1, breakRes: 3, effect: "Behaviors with Head have -1 Mov" },
        Back: { def: 0, breakRes: 3, effect: "Behaviors with Water have -1 Dodge" },
        Legs: { def: 0, breakRes: 2 },
        Tail: { def: 0, breakRes: 2 },
      },
    },
    "High Rank": {
      maxHP: 60,
      parts: {
        Head: { def: 1, breakRes: 3, effect: "Behaviors with Head have -1 Mov" },
        Back: { def: 0, breakRes: 3, effect: "Behaviors with Water have -1 Dodge" },
        Legs: { def: 0, breakRes: 2 },
        Tail: { def: 0, breakRes: 2 },
      },
    },
    "Master Rank": {
      maxHP: 65,
      parts: {
        Head: { def: 1, breakRes: 3, effect: "Behaviors with Head have -1 Mov" },
        Back: { def: 0, breakRes: 3, effect: "Behaviors with Water have -1 Dodge" },
        Legs: { def: 0, breakRes: 2 },
        Tail: { def: 0, breakRes: 2 },
      },
    },
    effects: `The first time Barroth moves onto a pond node, remove 1 break token from each body part that isn't broken.`,
    weakness: {
      Fire: 0,
      Water: 2,
      Thunder: 0,
      Ice: 2,
      Dragon: 0,
      Paralysis: 1,
      Poison: 1,
      Sleep: 2,
      Blast: 1,
      Stun: 0,
    },
  },
  Jyuratodus:null,
  "Pukei-Pukei":null,
  Diablos: null,
  "Black Diablos":null
}