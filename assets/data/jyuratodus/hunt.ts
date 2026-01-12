const monsterHunt = {
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
      Head: { def: 2, breakRes: 6, effect: "Behaviors with Skull have -1 Dodge" },
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
}

export default monsterHunt
