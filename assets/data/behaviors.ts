import { Behavior, MonsterKind } from "./types";
import barroth from "./barroth";
import pukey_pukei from "./pukei_pukei";
import jyuratodus from "./jyuratodus";
import diablos from "./diablos";  
import brachydios from "./brachydios";

export const BehaviorData: Record<MonsterKind, (Behavior|null)[] | null> = {
  Barroth: barroth.behavior,
  "Pukei-Pukei": pukey_pukei.behavior,
  Jyuratodus: jyuratodus.behavior,
  Diablos: diablos.behavior, 
  "Black Diablos": null,
  Brachydios: brachydios.behavior,
}