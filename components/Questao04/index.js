import React from 'react';
import { SectionList, View, Text, StyleSheet } from 'react-native';

export default function Questao04() {
  const tarefasPorDia = [
    {
      title: 'Segunda-feira',
      data: ['Estudar React Native', 'Fazer exercícios físicos', 'Organizar a semana'],
    },
    {
      title: 'Terça-feira',
      data: ['Ler um livro', 'Praticar esportes', 'Fazer mercado'],
    },
    {
      title: 'Quarta-feira',
      data: ['Estudar programação', 'Assistir a um filme', 'Cozinhar algo novo'],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas por Dia</Text>
      <SectionList
        sections={tarefasPorDia}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 5,
  },
  item: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
  },
});
