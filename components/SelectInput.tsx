import React, { useState } from "react";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Text, View } from "./Themed";

const SNAP_WIDTH = 360;

type SelectInputProps<T> = {
  data: T[];
  setValue: React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);
  label?: string;
};

// injected dependency: force options to have a toString method, primitive types already have a cast
export const SelectInput = <T extends string | number | { toString: () => string }>({
  label,
  data,
  setValue,
}: SelectInputProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderItem: ListRenderItem<T> = ({ item }) => {
    return (
      <Text variant="caption" style={{ width: SNAP_WIDTH, paddingHorizontal: 16 }}>
        {typeof item === `object` ? item.toString() : (item as string)}
      </Text>
    );
  };
  return (
    <View style={{ marginBottom: 16, width: SNAP_WIDTH }}>
      {label ? (
        <Text
          variant="subtitle"
          style={{ paddingHorizontal: 16, paddingVertical: 6, marginBottom: 8 }}
        >
          {label}:
        </Text>
      ) : (
        <View style={{ height: 10 }} />
      )}
      <FlatList<T>
        horizontal
        data={data}
        renderItem={renderItem}
        snapToOffsets={data.map((_, i) => i * SNAP_WIDTH)}
        scrollEventThrottle={64}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SNAP_WIDTH);
          setValue(data[index]);
          setCurrentIndex(index);
        }}
      />
      <View
        style={{
          marginTop: 8,
          height: 6,
          width: `100%`,
          backgroundColor: `#8883`,
          borderRadius: 3,
        }}
      >
        <View
          style={{
            height: 6,
            width: SNAP_WIDTH / data.length,
            left: (SNAP_WIDTH / data.length) * currentIndex,
            backgroundColor: `#8886`,
            borderRadius: 3,
          }}
        />
      </View>
    </View>
  );
};
