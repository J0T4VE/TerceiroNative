import React from 'react';
import { View, Text, Button, StyleSheet, ProgressBarAndroid } from 'react-native';

export default function QuizScreen({ navigation, route }) {
  const { questionNumber, totalQuestions } = route.params;

  const progress = questionNumber / totalQuestions;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questão {questionNumber} de {totalQuestions}</Text>

      <Text style={styles.questionText}>Esta é a pergunta {questionNumber}?</Text>

      <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" progress={progress} />

      <View style={styles.buttonContainer}>
        {questionNumber > 1 && (
          <Button
            title="Anterior"
            onPress={() => navigation.navigate('QuizScreen', { questionNumber: questionNumber - 1, totalQuestions })}
          />
        )}
        {questionNumber < totalQuestions && (
          <Button
            title="Próxima"
            onPress={() => navigation.navigate('QuizScreen', { questionNumber: questionNumber + 1, totalQuestions })}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
});
