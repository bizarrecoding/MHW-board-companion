import { Ailments, Elements, MonsterKind, RankType } from "./types"
import barroth from "./barroth"
import pukei_pukei from "./pukei_pukei"
import jyuratodus from "./jyuratodus"
import diablos from "./diablos" 
import brachydios from "./brachydios"

export type PartsData =  Record<"Head"|"Back"|"Legs"|"Tail", { def: number; breakRes: number; effect?: string }>

type HuntData = {
  maxHP: number
  parts:PartsData
  effects: string;
}
type RankData = Record<RankType, HuntData | null> & {
  effects?: string
  weakness: Record<Elements|Ailments, number>
}
type MonsterData = Record<MonsterKind, RankData | null>

export const MonsterHuntData: MonsterData = {
  Barroth: barroth.hunt,
  "Pukei-Pukei": pukei_pukei.hunt,
  Jyuratodus: jyuratodus.hunt,
  Diablos: diablos.hunt,
  Brachydios: brachydios.hunt,
  "Black Diablos":null
}