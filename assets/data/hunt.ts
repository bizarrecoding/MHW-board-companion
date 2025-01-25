import { Ailments,Elements } from "../../components/screens/monster/ResistanceIcon";
import { MonsterKind, RankType } from "./types"

export type PartsData =  Record<"Head"|"Back"|"Legs"|"Tail", { def: number; breakRes: number; effect?: string }>

type HuntData = {
  maxHP: number
  parts:PartsData
  effects: string;
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
      effects: `The first time Barroth moves onto a pond node, remove 1 break token from each body part that isn't broken.`
    },
    "High Rank": {
      maxHP: 60,
      parts: {
        Head: { def: 2, breakRes: 4, effect: "Behaviors with Head have -1 Mov" },
        Back: { def: 1, breakRes: 4, effect: "Behaviors with Water have -1 Dodge" },
        Legs: { def: 0, breakRes: 3, effect: "Discard the top card of the behavior deck" },
        Tail: { def: 0, breakRes: 3 },
      },
      effects: `The first time Barroth moves onto a pond node, remove 1 break token from each body part that isn't broken.`
    },
    "Master Rank": {
      maxHP: 65,
      parts: {
        Head: { def: 3, breakRes: 5, effect: "Behaviors with Head have -1 Mov" },
        Back: { def: 2, breakRes: 5, effect: "Behaviors with Water have -1 Dodge" },
        Legs: { def: 1, breakRes: 4, effect: "Discard the top card of the behavior deck" },
        Tail: { def: 1, breakRes: 4, effect: "No longer removes Break tokens on ponds" },
      },
      effects: `The first time Barroth moves onto a pond node, remove 1 break token from each body part that isn't broken.`
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
  "Pukei-Pukei":{
    "Low Rank": {
      maxHP: 60,
      parts: {
        Head: { def: 0, breakRes: 3 },
        Back: { def: 0, breakRes: 0 },
        Legs: { def: 1, breakRes: 3, effect: "Behaviors with Claw have +1 hunter"  },
        Tail: { def: 1, breakRes: 4 },
      },
      effects: `When Hunter is poisoned by Pukei-Pukei, takes -3 instead of -2.`
    },
    "High Rank": {
      maxHP: 65,
      parts: {
        Head: { def: 1, breakRes: 4 },
        Back: { def: 0, breakRes: 0 },
        Legs: { def: 2, breakRes: 4, effect: "Behaviors with Claw have +1 Hunter" },
        Tail: { def: 1, breakRes: 5, effect: "Behaviors with Tail have -1 Range" },
      },
      effects: `When Hunter is poisoned by Pukei-Pukei, takes -3 instead of -2. Behaviors with poison requires +1 Dodge.`
    },
    "Master Rank": {
      maxHP: 70,
      parts: {
        Head: { def: 2, breakRes: 5, effect: "Poison does -2 instead of -3" },
        Back: { def: 0, breakRes: 0 },
        Legs: { def: 3, breakRes: 5, effect: "Behaviors with Claw have +1 Hunter" },
        Tail: { def: 2, breakRes: 6, effect: "Behaviors with Tail have -1 Range" },
      },
      effects: `When Hunter is poisoned by Pukei-Pukei, takes -3 instead of -2. Behaviors requires +1 Dodge.`
    },
    effects: `The first time Barroth moves onto a pond node, remove 1 break token from each body part that isn't broken.`,
    weakness: {
      Fire: 2,
      Water: 0,
      Thunder: 1,
      Ice: 2,
      Dragon: 0,
      Paralysis: 1,
      Poison: 0,
      Sleep: 1,
      Blast: 2,
      Stun: 2,
    },
  },
  Jyuratodus:{
    "Low Rank": {
      maxHP: 65,
      parts: {
        Head: { def: 2, breakRes: 5, effect: "Behaviors with Skull have -1 Dodge." },
        Back: { def: 2, breakRes: 5 },
        Legs: { def: 2, breakRes: 4 },
        Tail: { def: 1, breakRes: 4, effect: "Behaviors with Tail have -1 Dmg" },
      },
      effects: `While Jyuratodus is on a pond node, Behaviors requires +1 Dodge.`,
    },
    "High Rank": {
      maxHP: 70,
      parts: {
        Head: { def: 2, breakRes: 6, effect: "Behaviors with Skull have -1 Dodge"  },
        Back: { def: 3, breakRes: 5 },
        Legs: { def: 3, breakRes: 5, effect: "Right leg has -1 Def" },
        Tail: { def: 2, breakRes: 5, effect: "Behaviors with Tail have -1 Dmg" },
      },
      effects: `While Jyuratodus is on a pond node, +1 Dmg, Behaviors requires +1 Dodge.`,
    },
    "Master Rank": {
      maxHP: 75,
      parts: {
        Head: { def: 3, breakRes: 6, effect: "Behaviors with Skull have -1 Dodge" },
        Back: { def: 3, breakRes: 6, effect: "Left leg has -1 Def" },
        Legs: { def: 3, breakRes: 6, effect: "Right leg has -1 Def" },
        Tail: { def: 2, breakRes: 3, effect: "Behaviors with Tail have -1 Dmg" },
      },
      effects: `While Jyuratodus is on a pond node, +1 Def, +1 Dmg, Behaviors requires +1 Dodge.`,
    },
    effects: `While Jyuratodus is on a pond node, +1 Def, +1 Dmg, Behaviors requires +1 Dodge.`,
    weakness: {
      Fire: 0,
      Water: 0,
      Thunder: 2,
      Ice: 2,
      Dragon: 0,
      Paralysis: 2,
      Poison: 2,
      Sleep: 0,
      Blast: 0,
      Stun: 2,
    },
  },
  Diablos: null,
  "Black Diablos":null
}