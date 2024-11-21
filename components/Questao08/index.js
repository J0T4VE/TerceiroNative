import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';

export default function Questao08() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  const fetchProdutos = async () => {
    try {
      const response = await fetch('https://dfef-dmrn-tps-default-rtdb.firebaseio.com/products.json');
      const data = await response.json();

      const produtosFormatados = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setProdutos(produtosFormatados);
      setProdutosFiltrados(produtosFormatados);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const aplicarFiltro = () => {
    const resultado = produtos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.description.toLowerCase().includes(filtro.toLowerCase())
    );
    setProdutosFiltrados(resultado);
  };

  const renderProduto = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagens[0] }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.description}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos com Filtro</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome ou descrição"
          value={filtro}
          onChangeText={setFiltro}
        />
        <Button title="Filtrar" onPress={aplicarFiltro} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={renderProduto}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  lista: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3,
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  preco: {
    fontSize: 16,
    color: '#4CAF50',
  },
});