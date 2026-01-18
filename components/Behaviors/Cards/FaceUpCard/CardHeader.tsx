import { View, StyleSheet } from 'react-native'
import React from 'react'
import InventoryIcon from '../../../InventoryIcon';
import TargetIcon from '../../TargetIcon';
import { Behavior, InventoryKind } from '../../../../assets/data/types';
import { Text } from '../../../Themed';
import { useThemeColor } from '../../../themed/useThemeColor';

type CardHeaderProps = {
  behavior: Behavior;
};

const getIconFromPart = (part: string): InventoryKind => {
  switch (part) {
    case `Head`:
      return `head`;
    case `Back`:
      return `ridge`;
    case `Legs`:
      return `claw`;
    case `Tail`:
      return `tail`;
    default:
      return `ore`;
  }
};

export const CardHeader:React.FC<CardHeaderProps> = ({ behavior }) => {
  const accentColor = useThemeColor({}, `accent`);
  const textColor = useThemeColor({ light: `#444`, dark: `#888` }, `text`);  
  return (
    <View style={styles.headerRow}>
      <View style={[styles.partIconWrapper, { borderColor: accentColor }]}>
        <InventoryIcon type={getIconFromPart(behavior.part)} />
      </View>
      <View style={styles.nameWrapper}>
        <Text bold style={styles.behaviorName}>{behavior.name}</Text>
        <Text style={[styles.partLabel, { color: textColor }]}>{behavior.part} Attack</Text>
      </View>
      <TargetIcon target={behavior.target} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  partIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  nameWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  behaviorName: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
  partLabel: {
    fontSize: 10,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
