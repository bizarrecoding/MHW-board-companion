import { DrawerToggleButton } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MonsterIcon } from '../../components/InventoryIcon';
import { Text } from '../../components/Themed';
import { commonStyles } from '../../components/themed/styles';
import { useThemeColor } from '../../components/themed/useThemeColor';
import { build } from '../../constants/build';
import { useResponsiveWidth } from '../../hooks/useResponsiveWidth';

const About: React.FC = () => {
  const { width } = useResponsiveWidth();
  const tintColor = useThemeColor({}, "tint");
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <DrawerToggleButton tintColor={tintColor} />
      </View>

      <View style={[styles.section, { width }]}>
        <MonsterIcon noRank type="Brachydios" style={styles.avatar} />
        <Text variant="title" style={styles.title}>MHW Board Companion</Text>
        <Text variant="caption" style={{ color: "#888", marginBottom: 16 }}>v{build}</Text>

        <View style={styles.card}>
          <Text variant="subtitle" bold style={styles.cardTitle}>Purpose</Text>
          <Text style={styles.text}>
            This application is a fan-made digital companion designed to complement your experience with the Monster Hunter World tabletop game.
            It helps you keep track of the complex book-keeping involved in a campaign, allowing you to focus on the hunt.
          </Text>
        </View>

        <View style={styles.card}>
          <Text variant="subtitle" bold style={styles.cardTitle}>Key Features</Text>
          <BulletItem icon="⚔️" text="Track Monster Hunts and simplify reward calculation." />
          <BulletItem icon="🎒" text="Manage your hunter's Inventory and materials." />
          <BulletItem icon="🛡️" text="Monitor your Character's gear, defense, and resistances." />
          <BulletItem icon="📖" text="Maintain a detailed Hunting Log of your progress." />
        </View>

        <View style={styles.card}>
          <Text variant="subtitle" bold style={styles.cardTitle}>Credits</Text>
          <Text style={styles.text}>
            Developed with ❤️ by <Text bold style={{ color: tintColor }}>BizarreCoding</Text>
          </Text>
          <Text style={[styles.text, styles.disclaimer]}>
            Monster Hunter: World and all associated logos and assets are trademarks of Capcom Co., Ltd.
            Monster Hunter World: The Board Game is a product of Steamforged Games.
            This app is not affiliated with, endorsed by, or sponsored by Capcom or Steamforged Games.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const BulletItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bulletIcon}>{icon}</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 8,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginHorizontal: "auto",
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
  },
  card: {
    ...commonStyles.card,
    width: '100%',
    padding: 20,
    marginTop: 24,
  },
  cardTitle: {
    marginBottom: 12,
  },
  text: {
    lineHeight: 22,
    opacity: 0.9,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletIcon: {
    fontSize: 18,
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    lineHeight: 22,
    opacity: 0.9,
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 12,
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
