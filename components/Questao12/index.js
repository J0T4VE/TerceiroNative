import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function Questao12() {
  const [proposicoes, setProposicoes] = useState([]);
  const [pagina, setPagina] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [loadingMore, setLoadingMore] = useState(false); 

  const fetchProposicoes = async (paginaAtual = 1) => {
    try {
      if (paginaAtual === 1) {
        setLoading(true); 
      } else {
        setLoadingMore(true); 
      }

      const response = await fetch(
        `https://dadosabertos.camara.leg.br/api/v2/proposicoes?pagina=${paginaAtual}&itens=10`
      );
      const data = await response.json();

      setProposicoes((prev) => (paginaAtual === 1 ? data.dados : [...prev, ...data.dados]));
    } catch (error) {
      console.error('Erro ao buscar proposições:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProposicoes();
  }, []);

  const carregarMais = () => {
    if (!loadingMore) {
      const proximaPagina = pagina + 1;
      setPagina(proximaPagina);
      fetchProposicoes(proximaPagina);
    }
  };

  const renderProposicao = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.ementa || 'Sem descrição'}</Text>
      <Text style={styles.data}>Data: {item.dataApresentacao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Proposições</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          data={proposicoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProposicao}
          onEndReached={carregarMais}
          onEndReachedThreshold={0.5} 
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#2196F3" /> : null
          }
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
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  data: {
    fontSize: 14,
    color: '#777',
  },
});
