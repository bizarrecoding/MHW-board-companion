import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import ResistanceIcon, { Ailments, Elements } from "./ResistanceIcon";
import { View, Text } from "../../Themed";
import { useThemeColor } from "../../themed/useThemeColor";

const ResistanceTabs: React.FC<{ data: Record<Ailments | Elements, number> }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(`status`);
  const [sleepRes, setSleepRes] = useState(data.Sleep);
  const [paraRes, setParaRes] = useState(data.Paralysis);
  const [poisonRes, setPoisonRes] = useState(data.Poison);
  const [stunRes, setStunRes] = useState(data.Stun);
  const [blastRes, setBlastRes] = useState(data.Blast);

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
              {/* Elements do not change, value is set to data.element and minimum 1 to show red cross */}
              <View style={{ flex: 1 }}>
                <Resistance type="Fire" value={data.Fire ?? 1} max={data.Fire} />
                <Resistance type="Water" value={data.Water ?? 1} max={data.Water} />
                <Resistance type="Thunder" value={data.Thunder ?? 1} max={data.Thunder} />
              </View>
              <View style={{ flex: 1 }}>
                <Resistance type="Ice" value={data.Ice ?? 1} max={data.Ice} />
                <Resistance type="Dragon" value={data.Dragon ?? 1} max={data.Dragon} />
              </View>
            </>
          ) : (
            <>
              <View style={{ flex: 1 }}>
                <Resistance
                  type="Paralysis"
                  value={paraRes}
                  max={data.Paralysis}
                  setValue={setParaRes}
                />
                <Resistance
                  type="Poison"
                  value={poisonRes}
                  max={data.Poison}
                  setValue={setPoisonRes}
                />
                <Resistance type="Sleep" value={sleepRes} max={data.Sleep} setValue={setSleepRes} />
              </View>
              <View style={{ flex: 1 }}>
                <Resistance type="Blast" value={blastRes} max={data.Blast} setValue={setBlastRes} />
                <Resistance type="Stun" value={stunRes} max={data.Stun} setValue={setStunRes} />
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

const ColorMap: Record<`light` | `dark`, Record<`red` | `gray` | `green` | `yellow`, string>> = {
  light: {
    gray: `#888A`,
    red: `#F33A`,
    green: `#383A`,
    yellow: `#CC3F`,
  },
  dark: {
    gray: `#8888`,
    red: `#F338`,
    green: `#3F36`,
    yellow: `#FF3C`,
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
              size={22}
              style={{ margin: 5 }}
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
              size={22}
              style={{ margin: 5 }}
            />
          );
        return (
          <FontAwesome
            key={`${type}-${i}}`}
            name="star"
            color={colors.yellow}
            size={22}
            style={{ margin: 5 }}
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
