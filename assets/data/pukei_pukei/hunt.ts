const monsterHunt = {
  "Low Rank": {
    maxHP: 60,
    parts: {
      Head: { def: 0, breakRes: 3 },
      Back: { def: 0, breakRes: 0 },
      Legs: { def: 1, breakRes: 3, effect: "Behaviors with Claw have +1 hunter" },
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
}

export default monsterHunt
