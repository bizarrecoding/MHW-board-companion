const monsterHunt = {
  "Low Rank": {
    maxHP: 50,
    parts: {
      Head: { def: 0, breakRes: 3, effect: "Hunters hit by Head attacks are covered in slime. Slime limits movement and requires Sharpen to clean." },
      Back: { def: 2, breakRes: 2 },
      Legs: { def: 0, breakRes: 3, effect: "Hunters hit by Leg attacks are covered in slime. Slime limits movement and requires Sharpen to clean." },
      Tail: { def: 1, breakRes: 2 },
    },
    effects: `Brachydios leaves puddles of slime on the ground that explode after 3 turns if not cleaned.`,
  },
  "High Rank": {
    maxHP: 60,
    parts: {
      Head: { def: 1, breakRes: 4, effect: "Hunters hit by Head attacks are covered in slime. Slime limits movement and requires Sharpen to clean." },
      Back: { def: 2, breakRes: 3 },
      Legs: { def: 1, breakRes: 4, effect: "Hunters hit by Leg attacks are covered in slime. Slime limits movement and requires Sharpen to clean." },
      Tail: { def: 2, breakRes: 3 },
    },
    effects: `Brachydios leaves puddles of slime on the ground that explode after 2 turns if not cleaned.`,
  },
  "Master Rank": {
    maxHP: 70,
    parts: {
      Head: { def: 2, breakRes: 5, effect: "Hunters hit by Head attacks are covered in slime. Slime limits movement and requires Sharpen to clean." },
      Back: { def: 3, breakRes: 4 },
      Legs: { def: 2, breakRes: 5, effect: "Hunters hit by Leg attacks are covered in slime. Slime limits movement and requires Sharpen to clean." },
      Tail: { def: 3, breakRes: 4 },
    },
    effects: `Brachydios leaves puddles of slime on the ground that explode at the end of the turn if not cleaned.`,
  },
  effects: `Legs and head gimmick sticks hunters to slime. Slime limits movement and requires sharpen to clean it.`,
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
