import React, { useMemo } from "react";
import { ImageBackground, ScrollView, StyleSheet, useWindowDimensions } from "react-native";

import { Text, View } from "./Themed";
import { useThemeColor } from "./themed/useThemeColor";

type RollDisplayProps = {
  roll: number[];
};

const CHUNK_MAP = [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4];

const getStyleValuesForCard = (size: number) => {
  // font/image size scaling is not linear
  // the smaller the card/padding, the less the font/image size is scaled down to keep readability
  if (size > 66) return { padding: 16, fontSize: 60, imageSize: size };
  if (size > 36) return { padding: 12, fontSize: 40, imageSize: size + 4 };
  return { padding: 8, fontSize: 36, imageSize: size + 8 };
};

const RollDisplay: React.FC<RollDisplayProps> = ({ roll = [] }) => {
  const { width } = useWindowDimensions();
  const cardSize = useMemo(() => {
    if (roll.length === 0) return 0;
    if (roll.length === 1) return 180;
    // parent screen default padding = 16, chunk gap =16
    const offsetSum = 16 * 4;
    const size = width / CHUNK_MAP[roll.length] - offsetSum;
    return size;
  }, [width, roll.length]);

  const chunkedRoll = useMemo(() => {
    const chunk_size = CHUNK_MAP[roll.length];
    if (chunk_size === 0) return [];
    return roll.reduce((acc, _, i) => {
      if (i % chunk_size === 0) acc.push(roll.slice(i, i + chunk_size));
      return acc;
    }, [] as number[][]);
  }, [roll]);
  return (
    <ScrollView style={styles.container}>
      {chunkedRoll.map((row, i) => {
        return (
          <View key={i} style={styles.center_row}>
            {row.map((rollValue, j) => {
              return <CardPanel key={`${i}-${j}`} cardSize={cardSize} rollValue={rollValue} />;
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default RollDisplay;

type CardPanelProps = {
  cardSize: number;
  rollValue: number;
};

const CardPanel: React.FC<CardPanelProps> = ({ cardSize, rollValue }) => {
  const { padding, fontSize, imageSize } = getStyleValuesForCard(cardSize);
  const backgroundColor = useThemeColor({}, `card`);
  return (
    <View style={[styles.cardWrapper, { padding, backgroundColor }]}>
      <ImageBackground
        source={require(`../assets/images/Blast-MHW_Icon.png`)}
        resizeMode="contain"
        style={[
          styles.ImageBackground,
          {
            width: imageSize,
            height: imageSize,
          },
        ]}
      >
        <Text variant="title" style={[styles.rollValue, { fontSize, opacity: 0.9 }]}>
          {rollValue}
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: `row`,
    flexWrap: `wrap`,
  },
  center_row: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  cardWrapper: {
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `#8888`,
    padding: 16,
    margin: 16,
  },
  ImageBackground: {
    alignItems: `center`,
    justifyContent: `center`,
    minHeight: 45,
    minWidth: 45,
  },
  rollValue: {
    //color: `#333`,
    fontWeight: `bold`,
    // textShadowColor: `#fff`,
    // textShadowRadius: 4,
    // textShadowOffset: { width: 1, height: 1 },
  },
});
