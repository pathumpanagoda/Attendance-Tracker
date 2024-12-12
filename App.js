import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import React from 'react';


export default function App() {
  return (
    <>
    <StatusBar
        barStyle="light-content" // Use "dark-content" for white background
        style="light" // Use "default" for black background
      />
      <Navigation/>
    </>
  );
}

