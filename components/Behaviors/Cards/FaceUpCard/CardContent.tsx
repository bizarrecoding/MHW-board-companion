import { View, StyleSheet, ColorValue, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Behavior } from '../../../../assets/data/types';
import ResistanceIcon from '../../../screens/monster/ResistanceIcon';
import { useThemeColor } from '../../../themed/useThemeColor';
import DirectionalIcon from '../../DirectionalIcon';
import { Text } from '../../../Themed';

type CardContentProps = {
  behavior: Behavior;
};

type PanelProps = React.PropsWithChildren & {
  label: string;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
}

const Panel: React.FC<PanelProps> = ({ children, label, color = `#0001`, style }) => {
  const textColor = useThemeColor({ light: `#444`, dark: `#888` }, `text`);
  return (
    <View style={[styles.panel, { backgroundColor: color, flex: 1, rowGap: 2 }, style]}>
      <Text style={[styles.smallLabel, { color: textColor }]}>{label}</Text>
      {children}
    </View>
  );
};

const DirectionSize = 64;

export const CardContent:React.FC<CardContentProps> = ({ behavior }) => {
  const accentColor = useThemeColor({}, `accent`);
  const panelColor = useThemeColor({ light: `#0001`, dark: `#FFF1` }, `card`);
  const [movement, direction] = behavior.movement ?? [0, null];

  return (
    <View style={styles.statsContainer}>
      <Panel label="POTENTIAL DAMAGE" color={`${accentColor}15`} style={{ minHeight: 60 }}>
        <View style={styles.damageValueRow}>
          <Text bold style={styles.damageValue}>{behavior.damage}</Text>
          {behavior.effect && <ResistanceIcon type={behavior.effect} size={20} style={{ top: 4 }} />}
        </View>
      </Panel>
      <View style={styles.horizontalStats}>
        <Panel label="DODGE" color={panelColor}>
          <Text bold style={styles.statValue}>{behavior.dodge}</Text>
        </Panel>
        <Panel label="RANGE" color={panelColor}>
          <Text bold style={styles.statValue}>{behavior.range}</Text>
        </Panel>
      </View>
      <View style={styles.horizontalStats}>
        <Panel label="AOE" color={panelColor}>
          <DirectionalIcon size={DirectionSize} directions={behavior.area} />
        </Panel>
        <Panel label={`MOVEMENT (${movement})`} color={panelColor}>
          <DirectionalIcon size={DirectionSize} directions={direction ? [direction] : null} />
        </Panel>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    borderWidth: 2,
    padding: 16,
  },
  statsContainer: {
    gap: 12,
  },
  damageValueRow: {
    flexDirection: "row",
  },
  damageValue: {
    fontSize: 24,
    marginRight: 8,
  },
  horizontalStats: {
    flexDirection: "row",
    gap: 12,
  },
  panel: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  smallLabel: {
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
  },
});