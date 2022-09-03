import { useNavigation } from '@react-navigation/native';
import { CalendarBlank, ListDashes, Wallet } from 'phosphor-react-native';
import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Balance } from '../../components/Balance';
import { CalendarStatistics } from '../../components/CalendarStatistics';
import { Header } from '../../components/Header';
import { HistoricItem } from '../../components/HistoricItem';
import { ModalMenu } from '../../components/ModalMenu';
import { ModalWallets } from '../../components/ModalWallets';
import { Spinner } from '../../components/Spinner';
import { TitleSection } from '../../components/TitleSection';
import { useWallet } from '../../context/WalletsContext';
import { THEME } from '../../global/styles/theme';
import { styles } from './styles';

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function HomeScreen() {
  const { currentWallet, allMyWallets, isLoading, isLoadingChangeWalletData, lastActivityInCurrentWallet, totalBudget } = useWallet()
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

  useEffect(() => {
    if(isLoadingChangeWalletData) {
      modalRef2.current.close()
    }
  }, [isLoadingChangeWalletData])
  


  if(isLoading) return <Spinner />

  return (
    <View  style={styles.container}>
      <Header openModal={openModal} />
      <ModalMenu handleGoToScreen={handleGoToScreen} ref={modalRef} />
      <ModalWallets wallets={allMyWallets} ref={modalRef2} /> 
      {

        isLoadingChangeWalletData 
        ? <Spinner />
        : allMyWallets.length > 0
        ? (
          <>
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
                <Balance title="Receita" value={totalBudget.totalIncomeValue} />
                <Balance title="Despesa" value={totalBudget.totalSpendingValue} />
              </View>
              <View style={styles.section}>
                <View style={styles.headerSection}>
                  <TitleSection icon={<CalendarBlank size={24} color={THEME.colors.black} weight="bold" />} title="Dados Mensais" />
                  {/* <TouchableOpacity>
                    <Text style={styles.linkSection}>Ver Todos</Text>
                  </TouchableOpacity> */}
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
                    lastActivityInCurrentWallet.map(item => (
                      <HistoricItem key={item.id} item={item} />
                    ))
                  }
                </View>
              </View>
            </ScrollView>
          </>
        )
        : (
          <Text style={{marginTop: 20, textAlign: 'center', fontSize: 13, color: THEME.colors.gray[500]}}>Oops! Parece que você ainda não possui uma carteira!</Text>
        )
      }
    </View>
  );
}

export { HomeScreen }
