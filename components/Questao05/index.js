import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from './QuizScreen';

const Stack = createStackNavigator();

export default function Questao05() {
  const totalQuestions = 10;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Array.from({ length: totalQuestions }, (_, index) => (
          <Stack.Screen
            key={index}
            name={`QuizScreen${index + 1}`}
            component={QuizScreen}
            initialParams={{ questionNumber: index + 1, totalQuestions }}
            options={{ title: `Questão ${index + 1}` }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
