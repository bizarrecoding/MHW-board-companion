import { Ailments, Elements } from "../../components/screens/monster/ResistanceIcon";
import { MonsterKind, RankType } from "./types";

type Direction = "Front"|"Back"|"Left"|"Right";

export type Behavior = {
  name: string;
  rank?: RankType;
  part: "Head" | "Back" | "Legs" | "Tail";
  effect: Elements | Ailments | null;
  movement: [number, Direction | null];
  area: Direction[];
  target: "Melee"|"Ranged";
  damage: number;
  range: number;
  dodge: number;
  actions: number;
  turns: number;
}

export const BehaviorData: Record<MonsterKind, (Behavior|null)[] | null> = {
  Barroth: [
    null,
    { 
      name: "Skull Slam",
      part: "Head",
      effect: "Stun",
      movement: [2, "Back"],
      area: ["Front"],
      target: "Melee",
      damage: 6,
      range: 1,
      dodge: 4,
      actions: 3,
      turns: 1
    },{
      name: "Nose dive",
      part: "Head",
      effect: "Water",
      movement: [2, "Front"],
      area: ["Front"],
      target: "Melee",
      damage: 5,
      range: 2,
      dodge: 2,
      actions: 2,
      turns: 2
    },{
      rank: "High Rank",
      name: "Skull crush",
      part: "Head",
      effect: "Stun",
      movement: [2, "Back"],
      area: ["Front"],
      target: "Melee",
      damage: 7,
      range: 1,
      dodge: 3,
      actions: 3,
      turns: 2
    }, {
      name: "Thrash left",
      part: "Head",
      effect: null,
      movement: [3, "Front"],
      area: ["Front", "Left"],
      target: "Melee",
      damage: 6,
      range: 1,
      dodge: 3,
      actions: 2,
      turns: 1
    }, {
      name: "Thrash Right",
      part: "Head",
      effect: null,
      movement: [3, "Front"],
      area: ["Front", "Right"],
      target: "Melee",
      damage: 6,
      range: 1,
      dodge: 3,
      actions: 2,
      turns: 1
    }, {
      name: "Shoulder Barge",
      part: "Back",
      effect: null,
      movement: [2, "Front"],
      area: ["Front", "Left", "Right" ],
      target: "Ranged",
      damage: 7,
      range: 1,
      dodge: 3,
      actions: 1,
      turns: 2
    }, {
      rank:"Master Rank",
      name: "Furious Trample",
      part: "Back",
      effect: "Stun",
      movement: [4, "Front"],
      area: ["Front"],
      target: "Ranged",
      damage: 9,
      range: 2,
      dodge: 2,
      actions: 2,
      turns: 3
    },{
      name: "Mud Shake",
      part: "Back",
      effect: "Water",
      movement: [0, null],
      area: ["Front","Left","Right","Back"],
      target: "Melee",
      damage: 5,
      range: 2,
      dodge: 2,
      actions: 3,
      turns: 1
    },{
      name: "Steamroller",
      part: "Back",
      effect: "Stun",
      movement: [0, null],
      area: ["Front"],
      target: "Ranged",
      damage: 9,
      range: 1,
      dodge: 2,
      actions: 2,
      turns: 3
    },{
      name: "Tail smash",
      part: "Tail",
      effect: null,
      movement: [2, "Back"],
      area: ["Front", "Left", "Right", "Back"],
      target: "Melee",
      damage: 7,
      range: 2,
      dodge: 3,
      actions: 2,
      turns: 1
    },{
      rank: "High Rank",
      name: "Rear slam",
      part: "Tail",
      effect: "Water",
      movement: [2, "Back"],
      area: ["Back"],
      target: "Melee",
      damage: 6,
      range: 2,
      dodge: 2,
      actions: 2,
      turns: 2
    },{ 
      name: "Tail Thrash",
      part: "Tail",
      effect: null,
      movement: [1, "Front"],
      area: ["Back"],
      target: "Melee",
      damage: 7,
      range: 2,
      dodge: 2,
      actions: 2,
      turns: 2
    },{ 
      name: "Wide Sweep",
      part: "Tail",
      effect: "Water",
      movement: [2, "Front"],
      area: ["Left","Right","Back"],
      target: "Melee",
      damage: 7,
      range: 2,
      dodge: 3,
      actions: 3,
      turns: 1
    }
  ],
  "Pukei-Pukei": null,
  Jyuratodus: null,
  Diablos: null,
  "Black Diablos": null
}