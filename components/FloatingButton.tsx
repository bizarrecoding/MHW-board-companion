import React from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity, Platform, StyleSheet } from 'react-native';

type FloatingProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const hitSlop ={top: 10, bottom: 10, left: 10, right: 10};

export const FloatingButton: React.FC<FloatingProps> = React.memo(({ onPress, containerStyle={}, style={}, disabled, icon }) => {
  
  return (
    <View style={[styles.floatingButtonContainer, containerStyle]}>
      <TouchableOpacity
        onPress={() => !disabled && onPress?.()}
        hitSlop={Platform.select({ web: undefined, default: hitSlop })}
        disabled={disabled}
        activeOpacity={0.8}
        style={[{ opacity: disabled ? 0.5 : 1, display: `flex`}, style]}
      >
        <View style={styles.btnWrapperStyle}>{icon}</View>
      </TouchableOpacity>
    </View>
  );
});

FloatingButton.displayName = `FloatingButton`;

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: `absolute`,
    alignItems: `center`,
    justifyContent: `center`,
    right: 14,
    bottom: 20,
    zIndex: 2,
  },
  btnWrapperStyle: {
    backgroundColor: "#8888",
    borderColor: "#0003",
    borderWidth: 1,
    padding: 12,
    borderRadius: 100,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    color: `#000`,
  }
});
