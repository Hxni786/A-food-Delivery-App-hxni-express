// components/RestaurantCard.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../styles/theme";

const { width } = Dimensions.get("window");

const RestaurantCard = ({ restaurant }) => {
  const { name, cuisine, rating } = restaurant;
  const numericRating = Number(rating) || 0;

  const renderStars = (num) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Text key={s} style={[styles.starIcon, { color: s <= num ? theme.colors.star : theme.colors.textMuted }]}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      {/* Outer Glow Effect */}
      <View style={styles.glow} />
      
      <BlurView intensity={25} tint="dark" style={styles.blurContainer}>
        <LinearGradient
          colors={["rgba(255,255,255,0.08)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerContent}>
            {/* Header: Name and Rating */}
            <View style={styles.header}>
              <Text style={styles.name} numberOfLines={1}>{name}</Text>
              <LinearGradient
                colors={[theme.colors.primary, "#00C2FF"]}
                style={styles.ratingBadge}
              >
                <Text style={styles.ratingText}>{numericRating.toFixed(1)}</Text>
              </LinearGradient>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Footer: Cuisine and Stars */}
            <View style={styles.footer}>
              <View style={styles.cuisineBox}>
                <Text style={styles.cuisineText}>{cuisine}</Text>
              </View>
              {renderStars(numericRating)}
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: theme.spacing.lg,
    marginBottom:    theme.spacing.lg,
    borderRadius:    theme.radius.md,
    overflow:        "hidden",
    ...theme.shadow.glass,
  },

  glow: {
    position:        "absolute",
    top:             -2,
    left:            -2,
    right:           -2,
    bottom:          -2,
    backgroundColor: theme.colors.primary,
    opacity:         0.05,
    borderRadius:    theme.radius.md + 2,
  },

  blurContainer: {
    borderRadius:    theme.radius.md,
    borderWidth:     1,
    borderColor:     theme.colors.border,
  },

  gradientBorder: {
    padding: 1,
  },

  innerContent: {
    padding:         theme.spacing.lg,
    backgroundColor: "rgba(10, 10, 15, 0.4)",
  },

  header: {
    flexDirection:   "row",
    justifyContent:  "space-between",
    alignItems:      "center",
    marginBottom:    12,
  },

  name: {
    fontSize:    20,
    fontWeight:  "700",
    color:       theme.colors.textPrimary,
    fontFamily:  theme.fonts.heading,
    letterSpacing: 0.5,
    flex:        1,
    marginRight: 10,
  },

  ratingBadge: {
    paddingHorizontal: 12,
    paddingVertical:   4,
    borderRadius:      theme.radius.sm,
    ...theme.shadow.neon,
  },

  ratingText: {
    fontSize:   14,
    fontWeight: "900",
    color:      theme.colors.textOnPrimary,
  },

  divider: {
    height:          1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical:  12,
  },

  footer: {
    flexDirection:   "row",
    justifyContent:  "space-between",
    alignItems:      "center",
  },

  cuisineBox: {
    backgroundColor: "rgba(0, 242, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderRadius:      theme.radius.sm,
    borderWidth:       0.5,
    borderColor:       theme.colors.borderNeon,
  },

  cuisineText: {
    fontSize:      11,
    fontWeight:    "800",
    color:         theme.colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },

  starsRow: {
    flexDirection: "row",
    gap: 2,
  },

  starIcon: {
    fontSize: 14,
  },
});

export default RestaurantCard;
