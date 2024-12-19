import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig'; // Firebase config file

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Validate input fields
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Firebase signup
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created:', user);
        Alert.alert('Success', 'Account created successfully!');
        navigation.replace('TabGroup'); // Navigate to the main screen
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handle Firebase errors
        let alertMessage = errorMessage;
        if (errorCode === 'auth/email-already-in-use') {
          alertMessage = 'This email is already in use.';
        } else if (errorCode === 'auth/invalid-email') {
          alertMessage = 'Invalid email address.';
        } else if (errorCode === 'auth/weak-password') {
          alertMessage = 'Password should be at least 6 characters.';
        }

        console.error('Signup Error:', errorCode, errorMessage);
        Alert.alert('Error', alertMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Pologic</Text>
      </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Create an account</Text>

        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={[styles.loginText, styles.loginLink]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 100,
    backgroundColor: '#536bb3',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 50,    
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: -50,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#536bb3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginContainer: {
    position: 'absolute', // Position at the bottom
    bottom: 20, // Add spacing from the bottom of the screen
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
  },
  loginText: {
    color: '#536bb3',
  },
  loginLink: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#536bb3',
  },
});

export default SignupScreen;
