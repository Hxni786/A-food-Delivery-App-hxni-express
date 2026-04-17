// components/Loader.js
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../styles/theme";

const Loader = () => {
  const pulse = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, {
            toValue:         1.2,
            duration:        1000,
            useNativeDriver: true,
            easing:          Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulse, {
            toValue:         1,
            duration:        1000,
            useNativeDriver: true,
            easing:          Easing.inOut(Easing.ease),
          }),
        ]),
        Animated.timing(rotate, {
          toValue:         1,
          duration:        2000,
          useNativeDriver: true,
          easing:          Easing.linear,
        }),
      ])
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange:  [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.ringWrapper}>
        <Animated.View style={[styles.glow, { transform: [{ scale: pulse }] }]} />
        <Animated.View style={[styles.ring, { transform: [{ rotate: spin }] }]}>
          <LinearGradient
            colors={[theme.colors.primary, "transparent"]}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
      <Text style={styles.text}>Syncing with hxni network...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:           1,
    alignItems:     "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },

  ringWrapper: {
    width:          100,
    height:         100,
    alignItems:     "center",
    justifyContent: "center",
    marginBottom:   30,
  },

  glow: {
    position:        "absolute",
    width:           60,
    height:          60,
    borderRadius:    30,
    backgroundColor: theme.colors.primary,
    opacity:         0.2,
    ...theme.shadow.neon,
  },

  ring: {
    width:           80,
    height:          80,
    borderRadius:    40,
    borderWidth:     2,
    borderColor:     "transparent",
    borderTopColor:  theme.colors.primary,
    borderRightColor: theme.colors.primary,
  },

  gradient: {
    flex: 1,
    borderRadius: 40,
  },

  text: {
    fontSize:      12,
    fontWeight:    "700",
    color:         theme.colors.primary,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily:    theme.fonts.mono,
  },
});

export default Loader;
