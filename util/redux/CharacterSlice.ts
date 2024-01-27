import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  ArmorPiece,
  HunterProfile,
} from "../../components/screens/characterScreen/ICharacter";
import { ArmorTypes, WeaponTypes } from "../../components/screens/characterScreen/ICharacter";

type ActionChangeGear = {
  itemType: ArmorTypes;
  item: ArmorPiece;
};
export interface CharacterState {
  profile: HunterProfile;
  hasProfileBeenEdit: boolean;
}

const initialState: CharacterState = {
  profile: {
    profile_id: `-1`,
    name: ``,
    equipment: {
      armor: {
        head: null,
        chest: null,
        arms: null,
        waist: null,
        legs: null,
      },
      weapon: {
        type: WeaponTypes.INSECT_GLAIVE,
        equipped: null,
      },
    },
    inventory: {
      potionHealth: 0,
      potionStamina: 0,
    },
    log: {},
  },
  hasProfileBeenEdit: false,
};

export const characterSlice = createSlice({
  name: `character`,
  initialState,
  reducers: {
    changeEquipmentItem: (state, action: PayloadAction<ActionChangeGear>) => {
      const oldValue = state.profile.equipment.armor[action.payload.itemType]?.id;
      const hasValueChanged = oldValue !== action.payload.item.id;
      if (hasValueChanged) {
        state.profile.equipment.armor = {
          ...state.profile.equipment.armor,
          [action.payload.itemType]: action.payload.item,
        };
      }
    },
    changeProfile: (state, action: PayloadAction<HunterProfile>) => {
      const oldValue = state.profile.profile_id;
      const hasValueChanged = oldValue !== action.payload.profile_id;
      if (hasValueChanged) {
        state.profile = { ...action.payload };
      }
    },
    enableSaveProfile: (state, action: PayloadAction<boolean>) => {
      state.hasProfileBeenEdit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeEquipmentItem, changeProfile, enableSaveProfile } = characterSlice.actions;

export default characterSlice.reducer;
