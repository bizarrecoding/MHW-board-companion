const monsterHunt = {
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
}

export default monsterHunt
