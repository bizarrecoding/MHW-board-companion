import { Ailments, ArmorKind, Elements, WeaponKind } from "../../assets/data/types";

export const getAttributeSource = (type: Elements | Ailments | "Defense") => {
  switch (type) {
    case "Fire":
      return require(`../../assets/images/resistance/elem-fire.webp`);
    case "Water":
      return require(`../../assets/images/resistance/elem-water.webp`);
    case "Ice":
      return require(`../../assets/images/resistance/elem-ice.webp`);
    case "Thunder":
      return require(`../../assets/images/resistance/elem-thunder.webp`);
    case "Dragon":
      return require(`../../assets/images/resistance/elem-dragon.webp`);
    case "Poison":
      return require(`../../assets/images/resistance/status-poison.webp`);
    case "Paralysis":
      return require(`../../assets/images/resistance/status-paralysis.webp`);
    case "Sleep":
      return require(`../../assets/images/resistance/status-sleep.webp`);
    case "Blast":
      return require(`../../assets/images/resistance/status-blast.webp`);
    case "Stun":
      return require(`../../assets/images/resistance/status-stun.webp`);
    default:
      return require(`../../assets/images/Defense.png`);
  }
};

export const getWeaponSource = (type: WeaponKind) => {
  switch (type) {
    case "Charge Blade":
      return require(`../../assets/images/weapons/Charge_Blade.webp`);
    case "Switch Axe":
      return require(`../../assets/images/weapons/Switch_Axe.webp`);
    case "Insect Glaive":
      return require(`../../assets/images/weapons/Insect_Glaive.webp`);
    case "Light Bowgun":
      return require(`../../assets/images/weapons/Light_Bowgun.webp`);
    default:
      return null;
  }
};

export const getArmorSource = (type: ArmorKind) => {
  switch (type) {
    case "helm":
      return require(`../../assets/images/armor/Helm.webp`);
    case "armor":
      return require(`../../assets/images/armor/Chest.webp`);
    case "leggins":
      return require(`../../assets/images/armor/Legs.webp`);
    default:
      return null;
  }
};
