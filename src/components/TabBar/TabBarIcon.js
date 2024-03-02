// components/TabBarIcon.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import THEME from '@constants/theme';

const TabBarIcon = ({ iconComponent, label, focused }) => (
  <View style={styles.container}>
    <View style={[styles.iconContainer, { backgroundColor: focused ? THEME.COLORS.white : THEME.COLORS.appTheme }]}>
      <Image source={iconComponent} style={styles.icon} tintColor={focused ? THEME.COLORS.lightBlack : THEME.COLORS.white} />
    </View>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: THEME.SIZE.widthMedium,
    height: THEME.SIZE.tabIconHeight,
    borderRadius: THEME.BORDER_RADIUS.iconRadius,
  },
  icon: {
    width: THEME.ICON_SIZE.small,
    height: THEME.ICON_SIZE.small,
  },
  label: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONT_SIZE.small,
    fontFamily: THEME.FONT_FAMILY.urbanistMedium,
  },
});

export default TabBarIcon;
