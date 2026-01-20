import React, { useState } from "react";
import { ListRenderItem, useWindowDimensions, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Text, View } from "./Themed";

const SNAP_WIDTH = 360;

type SelectInputProps<T> = {
  data: T[];
  setValue: React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);
  renderItem?: ListRenderItem<T>;
  label?: string;
};

// injected dependency: force options to have a toString method, primitive types already have a cast
export const SelectInput = <T extends string | number | { toString: () => string }>({
  label,
  data,
  setValue,
  renderItem,
}: SelectInputProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = useWindowDimensions().width - 32;
  const _renderItem: ListRenderItem<T> = ({ item, index, separators }) => {
    if (renderItem) return renderItem({ item, index, separators });
    return (
      <Text bold style={{ width, textAlign: `center`, fontSize: 24, paddingHorizontal: 16 }}>
        {typeof item === `object` ? item.toString() : (item as string)}
      </Text>
    );
  };
  return (
    <View style={{ marginBottom: 16, width }}>
      {label ? (
        <Text variant="subtitle" style={styles.label}>
          {label}:
        </Text>
      ) : (
        <View style={{ height: 10 }} />
      )}
      <FlatList<T>
        horizontal
        data={data}
        renderItem={_renderItem}
        snapToOffsets={data.map((_, i) => i * width)}
        scrollEventThrottle={64}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setValue(data[index]);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.slider}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
  },
  label: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 8,
  },
  slider: {
    marginTop: 8,
    height: 6,
    width: `100%`,
    backgroundColor: `#8883`,
    borderRadius: 3,
  },
});