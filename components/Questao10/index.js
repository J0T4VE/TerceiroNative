import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, ActivityIndicator, Picker } from 'react-native';

export default function Questao10() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [ordem, setOrdem] = useState('nomeCrescente'); 

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
    const resultado = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    aplicarOrdenacao(resultado);
  };

  const aplicarOrdenacao = (lista) => {
    const listaOrdenada = [...lista].sort((a, b) => {
      if (ordem === 'nomeCrescente') {
        return a.nome.localeCompare(b.nome);
      } else if (ordem === 'nomeDecrescente') {
        return b.nome.localeCompare(a.nome);
      } else if (ordem === 'precoCrescente') {
        return a.preco - b.preco;
      } else if (ordem === 'precoDecrescente') {
        return b.preco - a.preco;
      }
    });
    setProdutosFiltrados(listaOrdenada);
  };

  useEffect(() => {
    aplicarOrdenacao(produtosFiltrados);
  }, [ordem]);

  const renderProduto = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagens[0] }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos com Ordenação</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          value={filtro}
          onChangeText={setFiltro}
        />
        <Button title="Filtrar" onPress={aplicarFiltro} />
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Ordenar por:</Text>
        <Picker
          selectedValue={ordem}
          style={styles.picker}
          onValueChange={(itemValue) => setOrdem(itemValue)}
        >
          <Picker.Item label="Nome (Crescente)" value="nomeCrescente" />
          <Picker.Item label="Nome (Decrescente)" value="nomeDecrescente" />
          <Picker.Item label="Preço (Crescente)" value="precoCrescente" />
          <Picker.Item label="Preço (Decrescente)" value="precoDecrescente" />
        </Picker>
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
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
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
  preco: {
    fontSize: 16,
    color: '#4CAF50',
  },
});
