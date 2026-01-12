import barroth from "./barroth";
import diablos from "./diablos";
import jyuratodus from "./jyuratodus";
import pukey_pukei from "./pukei_pukei";
import brachydios from "./brachydios";
import { MonsterKind, StoryEntry } from "./types";

export const story: Record<MonsterKind, StoryEntry[]> = {
  Barroth: barroth.story,
  Diablos: diablos.story,
  Jyuratodus: jyuratodus.story,
  "Pukei-Pukei": pukey_pukei.story,
  "Black Diablos": diablos.story,
  Brachydios: brachydios.story,
};