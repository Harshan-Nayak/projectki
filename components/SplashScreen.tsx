import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { ThemedText } from './ThemedText';

export function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}>
        <ThemedText type="title" style={styles.appName}>Found.</ThemedText>
        <ThemedText style={styles.tagline}>Build.Connect.Ship</ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
});