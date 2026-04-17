// screens/HomeScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Font from "expo-font";
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";
import { Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_900Black } from "@expo-google-fonts/inter";

import { fetchRestaurants } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";
import Loader         from "../components/Loader";
import EmptyState     from "../components/EmptyState";
import theme          from "../styles/theme";

const { width, height } = Dimensions.get("window");
const HEADER_MAX_HEIGHT = 280;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HERO_IMAGE = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000";

const HomeScreen = () => {
  const [restaurants, setRestaurants]   = useState([]);
  const [query, setQuery]               = useState("");
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [fontsLoaded, setFontsLoaded]   = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  // ── Load Fonts ────────────────────────────────────────────────
  useEffect(() => {
    async function loadResources() {
      try {
        await Font.loadAsync({
          PlayfairDisplay_400Regular,
          PlayfairDisplay_700Bold,
          Inter_400Regular,
          Inter_500Medium,
          Inter_700Bold,
          Inter_900Black,
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadResources();
  }, []);

  // ── Fetch on mount ────────────────────────────────────────────
  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError("System offline. Re-sync required.");
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Filtering ──────────────────────────────────────────────────
  const filtered = restaurants.filter((r) =>
    r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];

  // ── Parallax Interpolations ────────────────────────────────────
  const headerHeight = scrollY.interpolate({
    inputRange:  [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange:  [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollY.interpolate({
    inputRange:  [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange:  [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange:  [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -10],
    extrapolate: "clamp",
  });

  // ── Render ─────────────────────────────────────────────────────
  if (!fontsLoaded) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Parallax Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          source={{ uri: HERO_IMAGE }}
          style={[
            styles.headerImage,
            { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
          ]}
        />
        <LinearGradient
          colors={["transparent", "rgba(10,10,15,0.8)", theme.colors.background]}
          style={styles.headerOverlay}
        />
        
        <Animated.View style={[
          styles.headerTitleContainer,
          { transform: [{ scale: titleScale }, { translateY: titleTranslateY }] }
        ]}>
          <Text style={styles.headerSubtitle}>PREMIUM SELECTION</Text>
          <Text style={styles.headerTitle}>hxni Express</Text>
          <View style={styles.neonUnderline} />
        </Animated.View>
      </Animated.View>

      <Animated.FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Height/Transforms on layout need false in some cases
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View style={styles.listHeaderInner}>
            {/* Glass Search Bar */}
            <BlurView intensity={30} tint="dark" style={styles.searchBlur}>
              <View style={styles.searchInner}>
                <Text style={styles.searchIcon}>📡</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Scan for cuisines..."
                  placeholderTextColor={theme.colors.textSecondary}
                  value={query}
                  onChangeText={setQuery}
                />
              </View>
            </BlurView>

            {/* Categories */}
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionLabel}>Active Streams</Text>
              <View style={styles.chipsRow}>
                {cuisines.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setQuery(prev => prev === c ? "" : c)}
                    style={[styles.chip, query === c && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, query === c && styles.chipTextActive]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        ListEmptyComponent={
          loading ? <Loader /> : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={loadRestaurants} style={styles.retryBtn}>
                <Text style={styles.retryText}>Re-Sync</Text>
              </TouchableOpacity>
            </View>
          ) : <EmptyState query={query} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: theme.colors.background,
  },

  // ── Parallax Styles ──
  header: {
    position:   "absolute",
    top:        0,
    left:       0,
    right:      0,
    overflow:   "hidden",
    zIndex:     10,
    backgroundColor: theme.colors.surfaceDark,
  },

  headerImage: {
    position: "absolute",
    top:      0,
    left:     0,
    right:    0,
    width:    null,
    height:   HEADER_MAX_HEIGHT,
    resizeMode: "cover",
  },

  headerOverlay: {
    position: "absolute",
    bottom:   0,
    left:     0,
    right:    0,
    height:   HEADER_MAX_HEIGHT / 1.5,
  },

  headerTitleContainer: {
    position: "absolute",
    bottom:   20,
    left:     theme.spacing.lg,
    right:    theme.spacing.lg,
    alignItems: "center",
  },

  headerSubtitle: {
    color:         theme.colors.primary,
    fontSize:      10,
    fontWeight:    "900",
    letterSpacing: 4,
    marginBottom:  4,
    fontFamily:    "Inter_900Black",
  },

  headerTitle: {
    color:      "#FFFFFF",
    fontSize:   42,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
    letterSpacing: -1,
  },

  neonUnderline: {
    width:           40,
    height:          3,
    backgroundColor: theme.colors.primary,
    marginTop:       10,
    borderRadius:    2,
    ...theme.shadow.neon,
  },

  // ── Scroll Content ──
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT,
    paddingBottom: 40,
  },

  listHeaderInner: {
    paddingHorizontal: theme.spacing.lg,
    marginTop:         20,
    marginBottom:      20,
  },

  searchBlur: {
    borderRadius:    theme.radius.md,
    overflow:        "hidden",
    borderWidth:     1,
    borderColor:     theme.colors.border,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  searchInner: {
    flexDirection:   "row",
    alignItems:      "center",
    height:          60,
    paddingHorizontal: 15,
  },

  searchIcon: {
    fontSize:    18,
    marginRight: 12,
  },

  searchInput: {
    flex:       1,
    color:      "#FFFFFF",
    fontSize:   16,
    fontFamily: "Inter_500Medium",
  },

  // ── Categories ──
  categoriesSection: {
    marginTop: 24,
  },

  sectionLabel: {
    color:         theme.colors.textMuted,
    fontSize:      11,
    fontWeight:    "800",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom:  12,
    fontFamily:    "Inter_700Bold",
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap:      "wrap",
    gap:           8,
  },

  chip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 16,
    paddingVertical:   8,
    borderRadius:      theme.radius.full,
    borderWidth:       1,
    borderColor:       "rgba(255,255,255,0.1)",
  },

  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor:     theme.colors.primary,
  },

  chipText: {
    color:      theme.colors.textSecondary,
    fontSize:   13,
    fontWeight: "600",
    fontFamily: "Inter_500Medium",
  },

  chipTextActive: {
    color: theme.colors.background,
  },

  // ── Error ──
  errorContainer: {
    padding:    60,
    alignItems: "center",
  },

  errorText: {
    color:      theme.colors.error,
    fontSize:   15,
    marginBottom: 20,
    fontFamily: "Inter_500Medium",
  },

  retryBtn: {
    borderWidth:     1,
    borderColor:     theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical:   10,
    borderRadius:       theme.radius.full,
  },

  retryText: {
    color:      theme.colors.primary,
    fontWeight: "700",
  },
});

export default HomeScreen;
