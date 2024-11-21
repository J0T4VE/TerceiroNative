import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

export default function Questao03() {
  const listaCompras = [
    { id: '1', nome: 'Arroz' },
    { id: '2', nome: 'Feijão' },
    { id: '3', nome: 'Macarrão' },
    { id: '4', nome: 'Frango' },
    { id: '5', nome: 'Batata' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <FlatList
        data={listaCompras}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nome}</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
});
