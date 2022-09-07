import { List } from 'phosphor-react-native';
import React from 'react';
import { View } from 'react-native';
import { ButtonAdd } from '../ButtonAdd';
import { Title } from '../Title';
import { styles } from './styles';

interface HeaderProps {
  openModal: () => void,
}

function Header({openModal}: HeaderProps) {

  return (
    <View style={styles.container}>
      <Title />
      <ButtonAdd onPress={openModal} icon={<List color="white" size={28} />}  />
    </View>
  );
}

export { Header }
