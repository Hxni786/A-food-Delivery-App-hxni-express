// App.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import theme from "./styles/theme";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={theme.colors.background} />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: theme.colors.background,
  },
});
