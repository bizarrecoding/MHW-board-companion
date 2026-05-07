const monsterHunt = {
  "Low Rank": {
    maxHP: 60,
    parts: {
      Head: { def: 1, breakRes: 3, effect: "Behaviors with Head have +1 Damage" },
      Back: { def: 0, breakRes: 3 },
      Legs: { def: 0, breakRes: 2 },
      Tail: { def: 1, breakRes: 3, effect: "Behaviors with Tail gain Fire effect" },
    },
    effects: `Rathalos gains Fire resistance. Behaviors with Fire effect deal +1 damage.`
  },
  "High Rank": {
    maxHP: 70,
    parts: {
      Head: { def: 2, breakRes: 4, effect: "Behaviors with Head have +1 Damage" },
      Back: { def: 1, breakRes: 4, effect: "Behaviors with Poison have +1 Dodge" },
      Legs: { def: 0, breakRes: 3 },
      Tail: { def: 1, breakRes: 4, effect: "Behaviors with Tail gain Fire effect" },
    },
    effects: `Rathalos gains Fire resistance. Behaviors with Fire effect deal +1 damage.`
  },
  "Master Rank": {
    maxHP: 80,
    parts: {
      Head: { def: 3, breakRes: 5, effect: "Behaviors with Head have +2 Damage" },
      Back: { def: 2, breakRes: 5, effect: "Behaviors with Poison have +1 Dodge" },
      Legs: { def: 1, breakRes: 4 },
      Tail: { def: 2, breakRes: 5, effect: "Behaviors with Tail gain Fire effect" },
    },
    effects: `Rathalos gains Fire resistance. Behaviors with Fire effect deal +1 damage.`
  },
  effects: `Rathalos gains Fire resistance. Behaviors with Fire effect deal +1 damage.`,
  weakness: {
    Fire: 0,
    Water: 1,
    Thunder: 2,
    Ice: 0,
    Dragon: 3,
    Paralysis: 2,
    Poison: 0,
    Sleep: 1,
    Blast: 1,
    Stun: 1,
  },
}

export default monsterHunt
