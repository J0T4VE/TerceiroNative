import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function Questao02() {
  const listaTarefas = [
    'Estudar React Native',
    'Fazer exercícios',
    'Ler um livro',
    'Praticar esportes',
    'Organizar as tarefas da semana',
  ];

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        {listaTarefas.map((tarefa, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{tarefa}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
});
