import { Dispatch } from "react";

export type HunterProfile = {
    profile_id: string;
    name: string;
    equipment: {
        head: string;
        chest: string;
        arms: string;
        waist: string;
        boots: string;
        weapon: string;
    };
    inventory: {
        potionHealth: number;
        potionStamina: number;
    };
    log: any;
};

export type PlayerCharacterArgs = {
    playerProfile: HunterProfile | null;
    setPlayerProfile: Dispatch<HunterProfile | null>;
}

export type ProfilePickerArgs = PlayerCharacterArgs & { onProfileSelection: () => void; }