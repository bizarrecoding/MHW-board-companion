const monsterHunt = {
  "Low Rank": {
    maxHP: 80,
    parts: {
      Head: { def: 4, breakRes: 7, effect: "Behaviors with Head have -1 Dmg" },
      Back: { def: 3, breakRes: 5, effect: "Remove any Back behavior and shuffle deck" },
      Legs: { def: 3, breakRes: 6, effect: "Legs have -1 Def" },
      Tail: { def: 3, breakRes: 6, effect: "Behaviors with Head have -1 Dodge"  },
    },
    effects: `Delving Wyvern: When target is selected for a claw behavior, put B.Diablos in the target node without changing its face and resolve behavior.`
  },
  "High Rank": {
    maxHP: 85,
    parts: {
      Head: { def: 4, breakRes: 7, effect: "Behaviors with Head have -1 Dmg" },
      Back: { def: 4, breakRes: 7, effect: "Remove any Back behavior and shuffle deck" },
      Legs: { def: 4, breakRes: 6, effect: "Legs have -1 Def" },
      Tail: { def: 3, breakRes: 6, effect: "Behaviors with Head have -1 Dodge"  },
    },
    effects: `Delving Wyvern: When target is selected for a claw behavior, put B.Diablos in the target node without changing its face and resolve behavior.\nClaw Behaviors gain 1 Dmg.`
  },
  "Master Rank": {
    maxHP: 90,
    parts: {
      Head: { def: 5, breakRes: 8, effect: "Behaviors with Head have -1 Dmg" },
      Back: { def: 4, breakRes: 7, effect: "Remove any Back behavior and shuffle deck" },
      Legs: { def: 4, breakRes: 7, effect: "Legs have -1 Def" },
      Tail: { def: 4, breakRes: 6, effect: "Behaviors with Head have -1 Dodge"  },
    },
    effects: `Delving Wyvern: When target is selected for a Back behavior, put B.Diablos in the target node without changing its face and resolve behavior.\nClaw Behaviors gain 2 Dmg.`
  },
  effects: `Delving Wyvern: When target is selected for a Back behavior, put B.Diablos in the target node without changing its face and resolve behavior.\nClaw Behaviors gain 1 x Rank Dmg.`,
  weakness: {
    Fire: 0,
    Water: 2,
    Thunder: 0,
    Ice: 1,
    Dragon: 0,
    Paralysis: 1,
    Poison: 2,
    Sleep: 2,
    Blast: 2,
    Stun: 0,
  },
}

export default monsterHunt
