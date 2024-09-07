const tintColorLight = `#7A9A99`; //`#7A9A99`;
const tintColor = `#00965d`;
const tintColorDark = `#004d4b`;

export default {
  light: {
    text: `#222`,
    textSecondary: `#eee`,
    background: `#F3F3F3`,
    card: `#CCC`,
    accent: tintColorDark,
    tint: tintColorLight,
    tint_dark: tintColorDark,
    tabIconDefault: `#333`,
    tabIconSelected: tintColorDark,
  },
  dark: {
    text: `#eee`,
    textSecondary: `#222`,
    background: `#000`,
    card: `#333`,
    accent: tintColor,
    tint: tintColor,
    tint_dark: tintColorDark,
    tabIconDefault: `#888`,
    tabIconSelected: tintColor,
  },
};
