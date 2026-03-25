import barroth from "./barroth";
import black_diablos from "./black_diablos";
import brachydios from "./brachydios";
import diablos from "./diablos";
import jyuratodus from "./jyuratodus";
import pukei_pukei from "./pukei_pukei";
import { ItemEntry } from "./types";

export const ItemList: ItemEntry[] = [
  ...barroth.items,
  ...brachydios.items,
  ...jyuratodus.items,
  ...pukei_pukei.items,
  ...diablos.items,
  ...black_diablos.items,
  {
    type: "potion",
    name: "Potion",
    category: "common"

  },
  // Misc bones
  {
    type: "bone",
    name: "Monster Bone S",
    category: "common"
  },
  {
    type: "bone",
    name: "Monster Bone M",
    category: "common"
  },
  {
    type: "bone",
    name: "Monster Bone L",
    category: "common"
  },
  {
    type: "bone",
    name: "Monster Bone+",
    category: "common"
  },
  {
    type: "bone",
    name: "Monster Keenbone",
    category: "common"
  },
  {
    type: "bone",
    name: "Monster hardbone",
    category: "common"
  },
  {
    type: "bone",
    name: "Quality bone",
    category: "common"
  },
  {
    type: "bone",
    name: "Boulder bone",
    category: "common"
  },
  {
    type: "bone",
    name: "Ancient bone",
    category: "common"
  },
  // Misc ore
  {
    type: "ore",
    name: "Malachite Ore",
    category: "common"
  },
  {
    type: "ore",
    name: "Carbalite Ore",
    category: "common"
  },
  {
    type: "ore",
    name: "Fucium Ore",
    category: "common"
  },
  {
    type: "ore",
    name: "Dragonite Ore",
    category: "common"
  },
  {
    type: "ore",
    name: "Lightcrystal",
    category: "common"
  },
  {
    type: "gem",
    name: "Novacrystal",
    category: "common"
  },
  {
    type: "gem",
    name: "Dragonvein Crystal",
    category: "common"
  },
  {
    type: "mud",
    name: "Fertile Mud",
    category: "common"
  },
  {
    type: "hide",
    name: "Wingdrake hide",
    category: "common"
  },
  // Black Diablos
  {
    type: "shell",
    name: "Black Diablos Carapace",
    category: "common"
  },
  {
    type: "claw",
    name: "Black Spiral Horn",
    category: "common"
  },
  {
    type: "ridge",
    name: "Black Diablos Ridge",
    category: "common"
  },
  {
    type: "gem",
    name: "Wyvern Gem",
    category: "common"
  },
  //

];
