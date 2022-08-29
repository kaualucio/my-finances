import { CalendarBlank } from 'phosphor-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Balance } from '../../components/Balance';
import { CalendarStatistics } from '../../components/CalendarStatistics';
import { Header } from '../../components/Header';
import { TitleSection } from '../../components/TitleSection';
import { THEME } from '../../global/styles/theme';
import { styles } from './styles';

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.balance}>
        <Balance title="Receita" value={5000} />
        <Balance title="Despesa" value={0} />
      </View>
      <View>
        <TitleSection icon={<CalendarBlank size={24} color={THEME.colors.black} weight="bold" />} title="Dados Mensais" />
        <ScrollView  
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {
            months.map((item) => (
              <CalendarStatistics key={item} month={item} />
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
}

export { HomeScreen }
