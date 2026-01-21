import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ResistanceIcon from "./ResistanceIcon";
import { Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import { Ailments, Elements } from "../../assets/data/types";
import { commonStyles } from "../themed/styles";

const ResistanceTabs: React.FC<{ data: Record<Ailments | Elements, number> }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(`status`);
  const [fireRes, setFireRes] = useState(data.Fire);
  const [waterRes, setWaterRes] = useState(data.Water);
  const [iceRes, setIceRes] = useState(data.Ice);
  const [thunderRes, setThunderRes] = useState(data.Thunder);
  const [dragonRes, setDragonRes] = useState(data.Dragon);
  const [sleepRes, setSleepRes] = useState(data.Sleep);
  const [paraRes, setParaRes] = useState(data.Paralysis);
  const [poisonRes, setPoisonRes] = useState(data.Poison);
  const [stunRes, setStunRes] = useState(data.Stun);
  const [blastRes, setBlastRes] = useState(data.Blast);

  const tintColor = useThemeColor({}, `tint`);
  const activePanelStyle = { backgroundColor: `${tintColor}` };

  return (
    <View style={styles.container}>
      <View style={[styles.tabBar, { backgroundColor: commonStyles.card.backgroundColor }]}>
        <TouchableOpacity
          onPress={() => setActiveTab(`status`)}
          style={[styles.tab, activeTab === `status` && activePanelStyle]}
        >
          <Text style={[styles.tabText, activeTab === `status` && styles.activeTabText]}>
            ELEMENTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(`ailment`)}
          style={[styles.tab, activeTab === `ailment` && activePanelStyle]}
        >
          <Text style={[styles.tabText, activeTab === `ailment` && styles.activeTabText]}>
            AILMENTS
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.grid}>
          {activeTab === `status` ? (
            <>
              <View style={styles.column}>
                <Resistance type="Fire" value={fireRes} max={data.Fire} setValue={setFireRes} />
                <Resistance type="Water" value={waterRes ?? 1} max={data.Water} setValue={setWaterRes} />
                <Resistance type="Thunder" value={thunderRes} max={data.Thunder} setValue={setThunderRes} />
              </View>
              <View style={styles.column}>
                <Resistance type="Ice" value={iceRes} max={data.Ice} setValue={setIceRes} />
                <Resistance type="Dragon" value={dragonRes} max={data.Dragon} setValue={setDragonRes} />
              </View>
            </>
          ) : (
            <>
                <View style={styles.column}>
                  <Resistance type="Paralysis" value={paraRes} max={data.Paralysis} setValue={setParaRes} />
                  <Resistance type="Poison" value={poisonRes} max={data.Poison} setValue={setPoisonRes} />
                <Resistance type="Sleep" value={sleepRes} max={data.Sleep} setValue={setSleepRes} />
              </View>
                <View style={styles.column}>
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

const ColorMap = {
  gray: `#444`,
  red: `#F33`,
  yellow: `#FFD700`,
};

const Resistance: React.FC<ResistanceProps> = ({ type, value, max, setValue }) => {
  const onPressStatus = () => {
    if (!setValue || max === 0) return;
    setValue((v) => (v > 0 ? v - 1 : max));
  };

  return (
    <View style={styles.resContainer}>
      <TouchableOpacity onPress={onPressStatus}>
        <ResistanceIcon type={type} size={36} />
      </TouchableOpacity>
      <View style={styles.stars}>
        {[0, 1, 2].map((i) => {
          if (i === 0 && max === 0) {
            return <FontAwesome key={i} name="close" color={ColorMap.red} size={20} />;
          }
          if (i >= max) return <View key={i} style={styles.dot} />;
          if (i >= value) return <FontAwesome key={i} name="star-o" color={ColorMap.gray} size={24} />;
          return <FontAwesome key={i} name="star" color={ColorMap.yellow} size={24} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  tabBar: {
    flexDirection: `row`,
    //backgroundColor: `#1A1A1A`,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: `center`,
    borderRadius: 8,
  },
  tabText: {
    fontSize: 12,
    fontWeight: `600`,
    color: `#777`,
    letterSpacing: 1,
  },
  activeTabText: {
    color: `#FFF`,
  },
  content: {
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: `row`,
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 12,
  },
  resContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    gap: 8,
  },
  stars: {
    flexDirection: `row`,
    alignItems: `center`,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: `#222`,
    marginHorizontal: 8,
  },
});
