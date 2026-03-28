import { Skill } from "./types"

export const terrain = {
  Bush: "A hunter on a bush node has -4 threat.",
  Rock: "A hunter on a rock node may move 1 node without placing attack cards on their stamina board.",
  Pond: "When a hunter enters a pond node for any reason they must discard 1 card from their damage deck."
}

export const status = {
  Stun: {
    monster: "The monster's next behavior dodge becomes 1.",
    hunter: "The hunter must place a card face-down on their stamina board if possible.",
  },
  Poison: {
    monster: "The monster suffers 2 dmg at the end of their next turn.",
    hunter:  "The hunter suffers 2 dmg at the end of their next turn.",
  },
  Sleep: {
    monster: "Only resolve turn and actions on the monster's next behavior.",
    hunter: "The hunter cannot place attack cards on their board to attack, move or dodge until the end of their next turn.",
  },
  Paralysis: {
    monster: "If there is a movement on the monster's next behavior, it has a value of 0.",
    hunter: "The hunter must discard down to 2 cards.",
  },
  Blastblight: {
    monster: "Each part of the monster has -1 def until the end of its next turn.",
    hunter: "The hunter has -2 def until the end of their next turn.",
  },
}

export const skills: Record<Skill, string> = {
  "Aquatic Expert": " Gain immunity to pond nodes.",
  "Black Diablos Mastery": " Draw +1 damage card on non-elemental attacks.",
  "Botanist": "During the gathering phase, when the hunters gain a potion, they may all immediately recover to full health.",
  "Diablos Mastery": " Draw +1 damage card on non-elemental attacks.",
  "Heroics": " While at 2 health or less, draw +1 damage on non-elemental attacks.",
  "Guard": " Gain +1 armor when playing attacks that grant armor.", 
  "Part Breaker": " Cards with break gain +1 break.",
  "Poison Resistance": " You are immune to the poison status.",
  "Resentment": "If you recovered health during your previous turn, the first attack you play this turn gains +2 damage.",
  "Slugger": " Once per quest, apply +1 stun token.",
  "Sporepuff Expert": "When you recover health from anything that isn't a potion, recover 1 additional health.",
  "Stun Resistance": " You're immune to the stun status ailment.",
  "Water Attack": " Draw +1 damage card on water attacks.",
}

export const downtime_activities = {
  description: "As a group, spending 1 day allow you to perform up to 3 different activities. Every hunter performs the same activity 1 time and then move on to another activity.",
  activities: [
    {
      name: "Resource Center",
      description: "Roll 2 die and get 1 resource according to the result.",
      data: [
        "2 - Carbalite Ore",
        "3 - Machalite Ore",
        "4 - Dragonite Ore",
        "5 - Fucium Ore",
        "6 - Quality Bone",
        "7 - Monster Bone Small",
        "8 - Ancient Bone",
        "9 - Dragonvein Crystal",
        "10 - Boulder Bone",
        "11 - Coral Crystal",
        "12 - Firecell Stone",
      ],
    },
    {
      name: "Provisions Stockpile",
      description: "Remove any 3 Common resource to receive any 1 Common resource of your choice.",
    },
    {
      name: "Meowscular Chef",
      description:"Select 1 elemental type. Each hunter gains +1 resistance to that type during the next quest. Each hunter places a token of the selected elemental type on their weapon card as a reminder.",
    },
    {
      name: "Handler",
      description: "Replay any Investigation or Tempered Investigation quest in the next day even if you have exceeded 4 attempts.",
    },
  ],
}