import { PlusCircle } from 'phosphor-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { ButtonIcon } from '../ButtonIcon';
import { Title } from '../Title';
import { styles } from './styles';

function Header() {
  return (
    <View style={styles.container}>
      <Title />
      <ButtonIcon icon={<PlusCircle color="white" size={28} />}  />
    </View>
  );
}

export { Header }
