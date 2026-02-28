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
  },
  // Misc bones
  {
    type: "bone",
    name: "Monster Bone S",
  },
  {
    type: "bone",
    name: "Monster Bone M",
  },
  {
    type: "bone",
    name: "Monster Bone L",
  },
  {
    type: "bone",
    name: "Monster Bone+",
  },
  {
    type: "bone",
    name: "Monster Keenbone",
  },
  {
    type: "bone",
    name: "Monster hardbone",
  },
  {
    type: "bone",
    name: "Quality bone",
  },
  {
    type: "bone",
    name: "Boulder bone",
  },
  {
    type: "bone",
    name: "Ancient bone",
  },
  // Misc ore
  {
    type: "ore",
    name: "Malachite Ore",
  },
  {
    type: "ore",
    name: "Carbalite Ore",
  },
  {
    type: "ore",
    name: "Fucium Ore",
  },
  {
    type: "ore",
    name: "Dragonite Ore",
  },
  {
    type: "ore",
    name: "Lightcrystal",
  },
  {
    type: "gem",
    name: "Novacrystal",
  },
  {
    type: "gem",
    name: "Dragonvein Crystal",
  },
  {
    type: "mud",
    name: "Fertile Mud",
  },
  {
    type: "hide",
    name: "Wingdrake hide",
  },
  // Black Diablos
  {
    type: "shell",
    name: "Black Diablos Carapace",
  },
  {
    type: "claw",
    name: "Black Spiral Horn",
  },
  {
    type: "ridge",
    name: "Black Diablos Ridge",
  },
  {
    type: "gem",
    name: "Wyvern Gem",
  },
  //

];
