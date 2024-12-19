import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        navigation.replace("TabGroup");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      console.error("Please provide both email and password");
      return;
    }

    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        navigation.replace("TabGroup");
      })
      .catch((error) => {
        console.error("Error during login:", error.code, error.message);
      });
  };

  const navigateToSignup = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://your-logo-url.com/logo.png' }} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Enter your email and password to login.</Text>
        <TextInput style={styles.input} placeholder="Your email/username" onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Your password" secureTextEntry onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.signupText}>Signup Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007396',
    alignItems: 'center',
    paddingVertical: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007396',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#777',
  },
  signupText: {
    color: '#007396',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
