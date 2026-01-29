import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../Themed';
import { commonStyles } from '../themed/styles';
import { useThemeColor } from '../themed/useThemeColor';

type RollControlsProps = {
  rollDamage: (numberToRoll: number) => void;
};

export const RollControls:React.FC<RollControlsProps> = ({ rollDamage }) => {
  const [numberToRoll, setNumberToRoll] = useState(1);
  const accentColor = useThemeColor({}, `accent`);
  const cardColor = useThemeColor({}, `card`);
  const cardBorderColor = useThemeColor({}, `cardBorder`);
  const textColor = useThemeColor({}, `text`);

  const increment = () => setNumberToRoll((n) => (n < 10 ? n + 1 : n));
  const decrement = () => setNumberToRoll((n) => (n > 0 ? n - 1 : 0));
  return (
    <View style={[styles.controlsCard, {
      backgroundColor: cardColor,
      borderColor: cardBorderColor,
      marginBottom: Platform.OS === "web" ? 16 : 0
    }]}>
      <View style={styles.pickerSection}>
        <Text bold style={styles.pickerLabel}>DICE TO ROLL</Text>
        <View style={styles.pickerRow}>
          <View style={{ minWidth: 40 }}/>
          <TouchableOpacity
            onPress={decrement}
            style={[styles.pickerBtn, { borderColor: cardBorderColor }]}
          >
            <Text style={[styles.pickerBtnText, { color: `${textColor}8` }]}>-</Text>
          </TouchableOpacity>

          <View style={styles.numberDisplay}>
            <Text bold style={styles.numberText}>{numberToRoll}</Text>
          </View>

          <TouchableOpacity
            onPress={increment}
            style={[styles.pickerBtn, { borderColor: cardBorderColor }]}
          >
            <Text style={[styles.pickerBtnText, { color: `${textColor}8` }]}>+</Text>
          </TouchableOpacity>
          <ConfigLink />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => rollDamage(numberToRoll)}
        style={[styles.rollActionBtn, { backgroundColor: accentColor }]}
        activeOpacity={0.8}
      >
        <Text bold style={styles.rollActionText}>ROLL DAMAGE</Text>
      </TouchableOpacity>
    </View>
  )
}

const ConfigLink: React.FC = () => {
  const textColor = useThemeColor({}, `text`);
  return (
    <Link href="/modal?type=roll" asChild style={{ minWidth: 40, alignItems: `center`}}>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="cog"
            size={25}
            color={`${textColor}8`}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  controlsCard: {
    ...commonStyles.card,
    ...commonStyles.shadows,
    maxWidth: 600,
    marginHorizontal: `auto`, 
    padding: 16,
  },
  pickerSection: {
    alignItems: `center`,
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: `#777`,
    marginBottom: 12,
  },
  pickerRow: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-around`,
    gap: 20,
  },
  pickerBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `#8888880d`,
  },
  pickerBtnText: {
    fontSize: 24,
    lineHeight: 24, 
    textAlign: `center`,
  },
  numberDisplay: {
    minWidth: 40,
    alignItems: `center`,
  },
  numberText: {
    fontSize: 32,
    fontVariant: [`tabular-nums`],
  },
  rollActionBtn: {
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: `center`,
    justifyContent: `center`, 
  },
  rollActionText: {
    fontSize: 18,
    color: `#FFF`,
    letterSpacing: 2,
  },
});