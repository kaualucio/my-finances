import { useNavigation } from '@react-navigation/native';
import { CalendarBlank, ListDashes, Wallet } from 'phosphor-react-native';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Balance } from '../../components/Balance';
import { CalendarStatistics } from '../../components/CalendarStatistics';
import { Header } from '../../components/Header';
import { HistoricItem } from '../../components/HistoricItem';
import { ModalMenu } from '../../components/ModalMenu';
import { ModalWallets } from '../../components/ModalWallets';
import { TitleSection } from '../../components/TitleSection';
import { useWallet } from '../../context/WalletsContext';
import { THEME } from '../../global/styles/theme';
import { styles } from './styles';

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const items = [
  {
    id: '123',
    title: 'Compras do mês',
    date: '27/08/2022',
    value: 800
  },
  {
    id: '456',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
  {
    id: '789',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
]

function HomeScreen() {
  const { currentWallet, allMyWallets, isLoading, handleChangeCurrentWallet } = useWallet()
  const modalRef = useRef<Modalize>(null)
  const modalRef2 = useRef<Modalize>(null)
  const navigation = useNavigation()
  function openModal() {
    if(modalRef.current) {
      modalRef.current.open()
    }
  }
  function openModal2() {
    if(modalRef2.current) {
      modalRef2.current.open()
    }
  }

  function handleGoToScreen(screen: any) {
    modalRef.current.close()
    navigation.navigate(screen)
  }
  
  if(isLoading) return <Text>CARREGANDO...</Text>

  return (
    <View  style={styles.container}>
      <Header openModal={openModal} />
      <ModalMenu handleGoToScreen={handleGoToScreen} ref={modalRef} />
      <ModalWallets wallets={allMyWallets} ref={modalRef2} /> 
      <ScrollView
      style={{paddingHorizontal: 20,}}
        contentContainerStyle={{
          paddingVertical: 30
        }}
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <TitleSection icon={<Wallet size={24} color={THEME.colors.black} weight="bold" />} title={currentWallet?.name} />
            <TouchableOpacity onPress={openModal2}>
              <Text style={styles.linkSection}>Trocar Carteira</Text>
            </TouchableOpacity>
           
          </View>
        <View style={styles.balance}>
          <Balance title="Receita" value={5000} />
          <Balance title="Despesa" value={0} />
        </View>
        <View style={styles.section}>
          <View style={styles.headerSection}>
            <TitleSection icon={<CalendarBlank size={24} color={THEME.colors.black} weight="bold" />} title="Dados Mensais" />
            <TouchableOpacity>
              <Text style={styles.linkSection}>Ver Todos</Text>
            </TouchableOpacity>
          </View>
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
        <View style={styles.section}>
          <View style={styles.headerSection}>
            <TitleSection icon={<ListDashes size={24} color={THEME.colors.black} weight="bold" />} title="Histórico" />
            <TouchableOpacity onPress={() => handleGoToScreen('Historic')}>
              <Text style={styles.linkSection}>Ver Todos</Text>
            </TouchableOpacity>
          </View>
          <View>
            {
              items.map(item => (
                <HistoricItem key={item.id} item={item} />
              ))
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export { HomeScreen }
