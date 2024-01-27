import type { RefObject } from "react";
import { FlatList } from "react-native-gesture-handler";

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
