import { IconProps } from 'phosphor-react-native';
import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface TitleSectionProps {
  title: string,
  icon: ReactElement<IconProps>
}

function TitleSection({ icon, title }: TitleSectionProps) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export { TitleSection }
