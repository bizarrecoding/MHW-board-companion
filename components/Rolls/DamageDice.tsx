import { ImageBackground, View, StyleSheet } from "react-native";
import { useThemeColor } from "../themed/useThemeColor";
import { Text } from "../Themed";

type DamageDiceProps = {
  cardSize: number;
  rollValue: number;
};

const getStyleValuesForCard = (size: number) => {
  // font/image size scaling is not linear
  // the smaller the card/padding, the less the font/image size is scaled down to keep readability
  if (size > 66) return { padding: 16, fontSize: 60, imageSize: size };
  if (size > 36) return { padding: 12, fontSize: 40, imageSize: size + 4 };
  return { padding: 8, fontSize: 36, imageSize: size + 8 };
};


const DamageDice: React.FC<DamageDiceProps> = ({ cardSize, rollValue }) => {
  const { padding, fontSize, imageSize } = getStyleValuesForCard(cardSize);
  const backgroundColor = useThemeColor({}, `card`);
  const cardBorderColor = useThemeColor({}, `cardBorder`);
  const cardTextColor = useThemeColor({}, `text`);

  return (
    <View style={[
      styles.cardWrapper,
      {
        width: cardSize + padding * 2,
        height: cardSize + padding * 2,
        backgroundColor,
        borderColor: cardBorderColor
      }
    ]}>
      <ImageBackground
        source={require(`../../assets/images/Blast-MHW_Icon.png`)}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize, alignItems: `center`, justifyContent: `center` }}
      >
        <Text style={[styles.rollValue, { fontSize, color: `${cardTextColor}C` }]}>
          {rollValue}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default DamageDice;

const styles = StyleSheet.create({
  cardWrapper: {
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  rollValue: {
    fontWeight: `900`,
    textShadowColor: `rgba(0, 0, 0, 0.75)`,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
