import { EquipmentEntry, WeaponEntry } from "./types"

export const Armors: EquipmentEntry[] = [
  { 
    id: "leather_helm", 
    name: "Leather Helm", 
    type: "armor",
    kind: "helm",
    def: 0, 
    res:{
      type: "Fire",
      value: 1
    },
    effect: "Stun resistance: cannot be stunned"
  },
  { 
    id: "leather_armor", 
    name: "Leather Armor", 
    kind: "armor", 
    def: 1, 
    res:{
      type: "Water",
      value: 1
    },
    type: "armor" 
  },
  { 
    id: "leather_leggins", 
    name: "Leather Leggins", 
    kind: "leggins", 
    def: 0,
    res:{
      type: "Fire",
      value: 1
    }, 
    type: "armor"
  },
  { 
    id: "alloy_helm", 
    name: "Alloy Helm", 
    kind: "helm", 
    def: 1, 
    type: "armor" 
  },
  { 
    id: "alloy_armor", 
    name: "Alloy Armor", 
    kind: "armor", 
    def: 1, 
    type: "armor" 
  },
  { 
    id: "alloy_leggins", 
    name: "Alloy Greaves", 
    kind: "leggins", 
    def: 0, 
    type: "armor",
    effect: "Poison resistance: cannot be poisoned" 
  },
  { 
    id: "bone_helm", 
    name: "Bone Helm", 
    kind: "helm", 
    def: 1, 
    type: "armor" 
  },
  { 
    id: "bone_armor", 
    name: "Bone Mail", 
    kind: "armor", 
    def: 0, 
    type: "armor",
    effect: "Slugger: Increases stun damage +1 once" 
  },
  { 
    id: "bone_leggins", 
    name: "Bone Greaves", 
    kind: "leggins", 
    def: 0, 
    type: "armor", 
  },
  { 
    id: "barroth_helm", 
    name: "Barroth Helm", 
    kind: "helm", 
    def: 1,
    res:{
      type: "Water",
      value: 1
    }, 
    type: "armor", 
    effect: "Guard: Attack cards that block gains +1 Def" 
  },
  { 
    id: "barroth_armor", 
    name: "Barroth Mail", 
    kind: "armor", 
    def: 1,
    res:{
      type: "Water",
      value: 1
    }, 
    type: "armor", 
  },
  { 
    id: "barroth_leggins", 
    name: "Barroth Greaves", 
    kind: "leggins", 
    def: 1,
    res:{
      type: "Water",
      value: 1
    }, 
    type: "armor", 
  },
  { 
    id: "pukey-pukey_helm", 
    name: "Pukey Hood", 
    kind: "helm", 
    def: 1, 
    type: "armor", 
    res: {
      type: "Water",
      value: 1,
    },
    effect: "Sporepuff Expert: +1HP when recovering from anything that is not a potion" 
  },
  { 
    id: "pukey-pukey_armor", 
    name: "Pukey Mail", 
    kind: "armor", 
    def: 1, 
    type: "armor", 
    res: {
      type: "Water",
      value: 1,
    },
    effect: "Botanist: gather phase: when gain a potion, may fully recover without consuming the potion"
  },
  { 
    id: "pukey-pukey_leggins", 
    name: "Pukey Greaves", 
    kind: "leggins", 
    def: 1, 
    type: "armor", 
    res: {
      type: "Water",
      value: 1,
    },
    effect: "Poison resistance: cannot be poisoned" 
  },
  { 
    id: "jyura_helm", 
    name: "Jyura Helm", 
    kind: "helm", 
    def: 1, 
    type: "armor",
    res: {
      type: "Water",
      value: 1,
    },
    effect: "Aquatic Expert: ponds do not discard cards" 
  },
  { 
    id: "jyura_armor", 
    name: "Jyura Mail", 
    kind: "armor", 
    def: 1, 
    type: "armor",
    res: {
      type: "Water",
      value: 1,
    },
    effect: "Water Attack: +1 Water Dmg" 
  },
  { 
    id: "jyura_leggins", 
    name: "Jyura Greaves", 
    kind: "leggins", 
    def: 1, 
    type: "armor",
    res: {
      type: "Water",
      value: 2,
    },
  },
  { 
    id: "diablos_helm", 
    name: "Diablos Helm", 
    kind: "helm", 
    def: 1, 
    type: "armor",
    res: {
      type: "Fire",
      value: 1,
    },
    effect: "Heroics: when you have 2 or less HP, gain +1 draw to all non-elemental attacks" 
  },
  { 
    id: "diablos_armor", 
    name: "Diablos Mail", 
    kind: "armor", 
    def: 1, 
    type: "armor",
    res: {
      type: "Fire",
      value: 1,
    },
    effect: "Slugger: Increases stun damage +1 once" 
  },
  { 
    id: "diablos_leggins", 
    name: "Diablos Greaves", 
    kind: "leggins", 
    def: 2, 
    type: "armor",
    res: {
      type: "Fire",
      value: 1,
    },
    effect: "Set Bonus: Diablos Mastery: +1 draw for all non-elemental attacks" 
  },
{ 
    id: "black-diablos_helm", 
    name: "Diablos Nero Helm", 
    kind: "helm", 
    def: 1, 
    type: "armor",
    res: {
      type: "Fire",
      value: 1,
    },
    effect: "Set Bonus: Black Diablos Mastery: +1 draw for all non-elemental attacks" 
  },
  { 
    id: "black-diablos_armor", 
    name: "Diablos Nero Mail", 
    kind: "armor", 
    def: 1, 
    type: "armor",
    res: {
      type: "Fire",
      value: 1,
    },
    effect: "Resentment: ?" 
  },
  { 
    id: "black-diablos_leggins", 
    name: "Diablos Nero Greaves", 
    kind: "leggins", 
    def: 2, 
    type: "armor",
    res: {
      type: "Fire",
      value: 1,
    },
    effect: "Part breaker: +1 break counter on any attack that increases break"
  },
]

export const Weapons: WeaponEntry[] = [
  {
    id: "proto_commission_axe",
    type: "weapon",
    kind: "Charge Blade",
    name: "Proto Commission Axe",
    dices: [8, 4, 0, 0],
    element: null,
    effect: ""
  }, {
    id: "bone_strongarm",
    type: "weapon",
    kind: "Charge Blade",
    name: "Bone Strongarm",
    dices: [5, 5, 0, 0],
    element: null,
    effect: ""
  }, {
    id: "elite_commission_axe",
    type: "weapon",
    kind: "Charge Blade",
    name: "Elite Commission Axe",
    dices: [8, 3, 1, 0],
    element: null,
    effect: "-3 Return stroke\n+3 Powered Stroke"
  }, {
    id: "hard_bone_strongarm",
    type: "weapon",
    kind: "Charge Blade",
    name: "Hard Bone Strongarm",
    dices: [4, 5, 1, 0],
    element: null,
    effect: "-2 Charged Rising Slash\n+2 Quick Rising Slash"
  }, {
    id: "chrome_guardian",
    type: "weapon",
    kind: "Charge Blade",
    name: "Chrome Guardian",
    dices: [5, 4, 3, 0],
    element: null,
    def: 1,
    effect: "-3 Return stroke / Shield Block\n+3 Powered Stroke / Solid Block"
  }, {
    id: "mighty_strongarm",
    type: "weapon",
    kind: "Charge Blade",
    name: "Mighty Strongarm",
    dices: [3, 4, 3, 0],
    element: null,
    def: 1,
    effect: "-2 Charged Rising Slash / Forward Slash\n+2 Quick Rising Slash / Lunging Slash"
  }, {
    id: "mudslide_blade",
    type: "weapon",
    kind: "Charge Blade",
    name: "Mudslide Blade",
    dices: [3, 4, 5, 0],
    element: null,
    def: 1,
    effect: "-2 Elemental Round Slash\n+2 Slippery Round Slash"
  }, {
    id: "diablos_wall",
    type: "weapon",
    kind: "Charge Blade",
    name: "Diablos Wall",
    dices: [1, 7, 1, 1],
    element: null,
    def: 1,
    effect: "-2 Weak Slash\n+2 Deft Slash"
  }, {
    id: "jyura_depth",
    type: "weapon",
    kind: "Charge Blade",
    name: "Jyura Depth",
    dices: [1, 6, 5, 2],
    element: null,
    def: 1,
    effect: "-2 Elemental Round Slash / Amped Element Discharge\n+2 Slippery Round Slash / Water Element Discharge"
  }, {
    id: "diablos_tyrannis",
    type: "weapon",
    kind: "Charge Blade",
    name: "Diablos Tyrannis",
    dices: [1, 5, 2, 3],
    element: null,
    def: 1,
    effect: "-2 Weak Slash / Elemental Discharge\n+2 Deft Slash / Crippling Discharge"
  },
] 