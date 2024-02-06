import type { Dispatch, RefObject } from "react";
import { FlatList } from "react-native-gesture-handler";

export enum ArrowOptions {
  NONE = `none`,
  UP = `up`,
  DOWN = `down`,
  BOTH = `both`,
}
type UpdateScrollArrowsArgs = {
  itemIndex: number;
  listLength: number;
  setScrollArrows: Dispatch<ArrowOptions>;
  scrollArrows: ArrowOptions;
};
export const updateScrollArrows = ({
  itemIndex,
  listLength,
  setScrollArrows,
  scrollArrows,
}: UpdateScrollArrowsArgs) => {
  if (itemIndex < 0 || listLength === 0) return null;
  if (itemIndex === 0) return setScrollArrows(ArrowOptions.DOWN);
  if (itemIndex === listLength - 1) return setScrollArrows(ArrowOptions.UP);

  // If last state was 'BOTH', prevents updating state for same value.
  if (scrollArrows === ArrowOptions.BOTH) return null;

  return setScrollArrows(ArrowOptions.BOTH);
};

// const flatListRef = useRef<FlatList>(null);
export const scrollToSelectedItem = (
  flatListRef: RefObject<FlatList>,
  itemIndex: number,
  itemPixels: number
) => {
  if (flatListRef && itemIndex > 0)
    flatListRef.current?.scrollToOffset({
      offset: itemIndex * itemPixels,
    });
};
