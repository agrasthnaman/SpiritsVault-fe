import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';  // Ensure correct path
import SignUpScreen from './src/screens/SignUpScreen';  // Ensure correct path
import GoogleSignInButton from './src/components/GoogleSignInButton';  // Ensure correct import

// Create a Stack Navigator for the screens
const Stack = createStackNavigator();

// Define AppNavigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In button pressed');
    // Add your Google Sign-In logic here
  };

  return (
    <LinearGradient colors={['#2a061e', '#0a0006']} style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Sp</Text>
        <GoogleSignInButton onPress={handleGoogleSignIn} /> {/* Pass onPress handler */}
        <Text style={styles.title}>ritsVault</Text>
      </Animated.View>
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        Uncover the Essence Within
      </Animated.Text>

      {/* Navigate to AppNavigator */}
      <AppNavigator />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
  },
});
