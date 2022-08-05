import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  function handleNewOrder() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos!')
    }

    setIsLoading(true);

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso!');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Solicitação', 'Não foi possível registar sua solicitação!');
      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />

      <Input
        placeholder="Número do patrimônio"
        onChangeText={setPatrimony}
        mt={4}
      />
      <Input
        placeholder="Descrição do problema"
        onChangeText={setDescription}
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />

      <Button 
        title="Cadastrar" 
        onPress={handleNewOrder}
        isLoading={isLoading}
        mt={5} 
       />
    </VStack>
  );
}