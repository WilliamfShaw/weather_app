import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/main';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <Main></Main>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 2,
    backgroundColor: '#F1DEFF',
    textAlign: 'center',
    width: '100%',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
