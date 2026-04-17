// components/EmptyState.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../styles/theme";

const EmptyState = ({ query }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛸</Text>
      <Text style={styles.title}>No signals found</Text>
      <Text style={styles.subtitle}>
        The keyword "{query}" returned zero matches in this sector.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:        60,
    alignItems:     "center",
    justifyContent: "center",
  },
  icon: {
    fontSize:     64,
    marginBottom: 20,
    opacity:      0.6,
  },
  title: {
    fontSize:    22,
    fontWeight:  "700",
    color:       theme.colors.textPrimary,
    fontFamily:  theme.fonts.heading,
    marginBottom: 8,
  },
  subtitle: {
    fontSize:    14,
    color:       theme.colors.textSecondary,
    textAlign:   "center",
    fontFamily:  theme.fonts.body,
    lineHeight:  20,
  },
});

export default EmptyState;
