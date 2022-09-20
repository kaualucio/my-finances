import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp, FadeOutDown, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { Modalize } from 'react-native-modalize';
import { CalendarBlank, ListDashes, Wallet } from 'phosphor-react-native';

import { HistoricItem } from '../../components/HistoricItem';
import { ModalWallets } from '../../components/ModalWallets';
import { TitleSection } from '../../components/TitleSection';
import { ModalMenu } from '../../components/ModalMenu';
import { Balance } from '../../components/Balance';
import { Spinner } from '../../components/Spinner';
import { Header } from '../../components/Header';

import { useWallet } from '../../context/WalletsContext';

import { THEME } from '../../global/styles/theme';
import { styles } from './styles';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { sortDataBudget } from '../../utils/sortDataBudget';

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function HomeScreen() {
  const { handleSortDataStatistics, currentWallet, allMyWallets, isLoading, isLoadingChangeWalletData, lastActivityInCurrentWallet, totalBudget } = useWallet()
  const modalRef = useRef<Modalize>(null)
  const modalRef2 = useRef<Modalize>(null)
  const navigation = useNavigation()
  let budgetData = sortDataBudget(handleSortDataStatistics())
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


  // useEffect(() => {
  //   if(isLoading) {
  //     
  //   }
  // }, [isLoading])

  if(isLoading) return <Spinner />

  return (
    
      <View 
        style={styles.container}
      >
        <Header openModal={openModal} />
        <ModalWallets wallets={allMyWallets} ref={modalRef2} /> 
        <ModalMenu handleGoToScreen={handleGoToScreen} ref={modalRef} />
        {

          isLoadingChangeWalletData 
          ? <Spinner />
          : allMyWallets.length > 0
          ? (
            <Animated.View
              style={{flex: 1}}
              entering={FadeInUp.duration(100)}
              exiting={FadeOutDown.duration(100)}
            >
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
                <Animated.View 
                  entering={SlideInRight.delay(130)}
                  exiting={SlideOutLeft.duration(100)}
                  style={styles.balance}>
                  <Balance title="Receita" value={totalBudget.totalIncomeValue} />
                  <Balance title="Despesa" value={totalBudget.totalSpendingValue} />
                </Animated.View>
                <View style={styles.section}>
                  <View style={styles.headerSection}>
                    <TitleSection icon={<CalendarBlank size={24} color={THEME.colors.black} weight="bold" />} title="Dados Mensais" />
                  </View>
                  <ScrollView  
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                  <LineChart 
                    bezier
                    data={{
                      labels: months,
                      datasets: [
                        {
                          data: budgetData.incomes.length > 0 ? budgetData.incomes : [0],
                          color: (opacity = 1) => `rgba(142, 202, 230, ${opacity})`,
                          strokeWidth: 4
                        },
                        {
                          data: budgetData.spendings.length > 0 ? budgetData.spendings : [0],
                          color: (opacity = 1) => `rgba(255, 183, 3, ${opacity})` 
                        },
                      ]
                    }}
                    width={500} // from react-native
                    height={220}
                    chartConfig={{
                      backgroundGradientFrom: "#778DA9",
                      backgroundGradientFromOpacity: 1,
                      backgroundGradientTo: "#415A77",
                      backgroundGradientToOpacity: 1,
                      color: (opacity = 1) => `rgba(142, 202, 230, ${opacity})`,
                      strokeWidth: 3,
                      barPercentage: 0.5,
                      useShadowColorFromDataset: false,
                      labelColor: () => THEME.colors.white,
                      propsForLabels: {
                        fontSize: 12,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                      },
                      
                    }}
                    yAxisLabel="R$"
                    yAxisSuffix=""
                    style={{
                      borderRadius: 8,
                    }}
                    />
                    </ScrollView>

                </View>
                <View style={styles.section}>
                  <View style={styles.headerSection}>
                    <TitleSection icon={<ListDashes size={24} color={THEME.colors.black} weight="bold" />} title="Histórico" />
                    <TouchableOpacity onPress={() => handleGoToScreen('Historic')}>
                      <Text style={styles.linkSection}>Ver Todos</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{zIndex: 0}}>
                    {
                      lastActivityInCurrentWallet.map(item => (
                        <HistoricItem key={item.id} item={item} />
                      ))
                    }
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          )
          : (
            <Text style={{marginTop: 20, textAlign: 'center', fontSize: 13, color: THEME.colors.gray[500]}}>Oops! Parece que você ainda não possui uma carteira!</Text>
          )
        }
      </View>

  );
}

export { HomeScreen }
