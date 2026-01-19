const monsterHunt = {
  "Low Rank": {
    maxHP: 50,
    parts: {
      Head: { def: 0, breakRes: 3, effect: "Head does not apply slime" },
      Back: { def: 2, breakRes: 2 },
      Legs: { def: 0, breakRes: 3, effect: "Pounders do not apply slime" },
      Tail: { def: 1, breakRes: 2 },
    },
    effects: `Brachydios head and legs attacks leave puddles of slime that limits movement(-1) and explode after 3 turns if not cleaned.`,
  },
  "High Rank": {
    maxHP: 60,
    parts: {
      Head: { def: 1, breakRes: 4, effect: "Head does not apply slime" },
      Back: { def: 2, breakRes: 3 },
      Legs: { def: 1, breakRes: 4, effect: "Pounders do not apply slime" },
      Tail: { def: 2, breakRes: 3 },
    },
    effects: `Brachydios head and legs attacks leave puddles of slime that limits movement(-1) and explode after 2 turns if not cleaned.`,
  },
  "Master Rank": {
    maxHP: 70,
    parts: {
      Head: { def: 2, breakRes: 5, effect: "Head does not apply slime" },
      Back: { def: 3, breakRes: 4 },
      Legs: { def: 2, breakRes: 5, effect: "Pounders do not apply slime" },
      Tail: { def: 3, breakRes: 4 },
    },
    effects: `Brachydios head and legs attacks leave puddles of slime that limits movement(-1) and explode at the end of the turn if not cleaned.`,
  },
  effects: `Brachydios head and legs attacks leave puddles of slime that limits movement(-1) and explode at the end of the turn if not cleaned.`,
  weakness: {
    Fire: 0,
    Water: 3,
    Thunder: 1,
    Ice: 2,
    Dragon: 1,
    Paralysis: 2,
    Poison: 1,
    Sleep: 2,
    Blast: 0,
    Stun: 2,
  },
}

export default monsterHunt
