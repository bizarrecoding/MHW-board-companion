import barroth from "./barroth";
import black_diablos from "./black_diablos";
import brachydios from "./brachydios";
import diablos from "./diablos";
import jyuratodus from "./jyuratodus";
import pukey_pukei from "./pukei_pukei";
import { Behavior, MonsterKind } from "./types";

export const BehaviorData: Record<MonsterKind, (Behavior|null)[] | null> = {
  Barroth: barroth.behavior,
  "Pukei-Pukei": pukey_pukei.behavior,
  Jyuratodus: jyuratodus.behavior,
  Diablos: diablos.behavior, 
  "Black Diablos": black_diablos.behavior,
  Brachydios: brachydios.behavior,
}