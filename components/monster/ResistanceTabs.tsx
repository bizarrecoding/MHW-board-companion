import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import ResistanceIcon, { Ailments, Elements } from "./ResistanceIcon";
import { View, Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";

const ResistanceTabs = () => {
  const [activeTab, setActiveTab] = useState(`status`);
  const [sleepRes, _setSleepRes] = useState(2);
  const [paraRes, _setParaRes] = useState(1);
  const [poisonRes, _setPoisonRes] = useState(1);
  const [stunRes, _setStunRes] = useState(0);
  const [blastRes, _setBlastRes] = useState(1);

  const _panelColor = useThemeColor({}, `card`);
  const panelColor = `${_panelColor}8`;
  return (
    <View style={{ flex: 1, width: `100%` }}>
      <View style={[styles.tabHolder, { borderBottomColor: panelColor, borderBottomWidth: 1 }]}>
        <TouchableOpacity
          onPress={() => setActiveTab(`status`)}
          style={{
            flex: 1,
            borderTopLeftRadius: 8,
            backgroundColor: activeTab === `status` ? panelColor : undefined,
          }}
        >
          <Text style={styles.tab}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(`ailment`)}
          style={{
            flex: 1,
            borderTopRightRadius: 8,
            backgroundColor: activeTab === `ailment` ? panelColor : undefined,
          }}
        >
          <Text style={styles.tab}>Ailments</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{ flexDirection: `row`, justifyContent: `space-around` }}>
          {activeTab === `status` ? (
            <>
              <View style={{ flex: 1 }}>
                <Resistance type="Fire" value={0} max={0} />
                <Resistance type="Water" value={2} max={2} />
                <Resistance type="Thunder" value={0} max={0} />
              </View>
              <View style={{ flex: 1 }}>
                <Resistance type="Ice" value={2} max={2} />
                <Resistance type="Dragon" value={0} max={0} />
              </View>
            </>
          ) : (
            <>
              <View style={{ flex: 1 }}>
                <Resistance type="Paralysis" value={paraRes} max={1} setValue={_setParaRes} />
                <Resistance type="Poison" value={poisonRes} max={1} setValue={_setPoisonRes} />
                <Resistance type="Sleep" value={sleepRes} max={2} setValue={_setSleepRes} />
              </View>
              <View style={{ flex: 1 }}>
                <Resistance type="Blast" value={blastRes} max={1} setValue={_setBlastRes} />
                <Resistance type="Stun" value={stunRes} max={0} setValue={_setStunRes} />
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ResistanceTabs;

type ResistanceProps = {
  type: Elements | Ailments;
  value: number;
  max: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
};

const ColorMap: Record<`light` | `dark`, Record<`red` | `gray` | `green`, string>> = {
  light: {
    gray: `#888A`,
    red: `#F33A`,
    green: `#383A`,
  },
  dark: {
    gray: `#8888`,
    red: `#F338`,
    green: `#3F36`,
  },
};

const Resistance: React.FC<ResistanceProps> = ({ type, value, max, setValue }) => {
  const scheme = useColorScheme() ?? `light`;
  const colors = ColorMap[scheme];
  const onPressStatus = () => {
    if (!setValue || max === 0) return;
    setValue((v) => (v > 0 ? v - 1 : max));
  };
  return (
    <View style={styles.partCard}>
      <TouchableOpacity onPress={onPressStatus}>
        <ResistanceIcon type={type} size={32} />
      </TouchableOpacity>
      {[0, 0, 0].map((_, i) => {
        if (i === 0 && max === 0)
          return (
            <FontAwesome
              key={`${type}-${i}}`}
              name="close"
              color={colors.red}
              size={32}
              style={{ width: 32 }}
            />
          );
        if (i >= max && i >= value)
          return (
            <FontAwesome
              key={`${type}-${i}}`}
              name="circle"
              color={colors.gray}
              size={12}
              style={{ margin: 10 }}
            />
          );
        if (value < max && i >= value)
          return (
            <FontAwesome
              key={`${type}-${i}}`}
              name="circle-o"
              color={colors.red}
              size={32}
              style={{ width: 32 }}
            />
          );
        return (
          <FontAwesome
            key={`${type}-${i}}`}
            name="circle"
            color={colors.green}
            size={32}
            style={{ width: 32 }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  // Tabs
  tabHolder: {
    flexDirection: `row`,
    justifyContent: `space-around`,
  },
  tab: {
    textAlign: `center`,
    fontSize: 24,
    padding: 12,
  },
  // PartCard
  partCard: {
    flexDirection: `row`,
    alignItems: `center`,
    padding: 12,
  },
});
