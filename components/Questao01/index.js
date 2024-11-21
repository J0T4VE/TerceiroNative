import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Questao01() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Organização da Arquitetura do Projeto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
