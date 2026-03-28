import { useMemo } from "react";
import { ItemEntry } from "../../../assets/data/types";
import { findCategory } from "../../../hooks/useInventory";

export type EntrySection<T extends ItemEntry = ItemEntry> = {
  id: string;
  title: string;
  data: T[];
};

export const useInventoryCategories = <T extends ItemEntry>(inventory: T[]) => {
  const sections = useMemo(() => {
    const data = inventory.reduce(
      (rec, current) => {
        if (!current) return rec;
        const category = current.category ?? findCategory(current);
        const exist = Object.keys(rec)?.includes(category);
        if (!exist) rec[category] = { id: category, title: category, data: [] };
        rec[category].data.push(current);
        return rec;
      },
      {} as Record<string, EntrySection<T>>
    );

    return Object.values(data);
  }, [inventory]);

  return sections;
};
