import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { styles } from './styles'
import Animated, { FadeOut, Transition, Transitioning } from 'react-native-reanimated'
import { CaretDown, PlusCircle } from 'phosphor-react-native'
import { THEME } from '../../global/styles/theme'
import { useNavigation } from '@react-navigation/native'
import { ButtonWithoutIcon } from '../../components/ButtonWithoutIcon'
import { useWallet, Wallet } from '../../context/WalletsContext'
import { formatPriceValue } from '../../utils/formatPriceValue'


const transition = (
  <Transition.Together>
    <Transition.In type='fade' durationMs={200} />
    <Transition.Change durationMs={200} />
    <Transition.Out type='fade' durationMs={200} />
  </Transition.Together>
);

export default function AllMyWallets() {
  const { allMyWallets, isLoading, currentWallet, handleDeleteWallet, getMonetaryWalletInformation } = useWallet()
  const ref = useRef<any>(null)
  const [currentOpen, setCurrentOpen] = useState<any>(null)
  const [listWalletInformation, setListWalletInformation] = useState<any>([])
  const navigation = useNavigation()
  function handleOpenWalletInfo(walletId: string) {
    ref?.current.animateNextTransition()
    currentOpen === walletId ? setCurrentOpen(null) : setCurrentOpen(walletId)

  }

  function handleGoToCreateWalletScreen() {
    navigation.navigate('NewWallet')
  }

  function handleGoToEditWalletScreen(wallet: Wallet) {
    navigation.navigate('EditWallet', {
      wallet
    })
  }

  useEffect(() => {
    if(allMyWallets.length > 0 || isLoading) {
      setListWalletInformation(getMonetaryWalletInformation())
    }
  }, [allMyWallets, isLoading])


  async function handleDelete(walletId: string) {
    currentOpen === walletId ? setCurrentOpen(null) : setCurrentOpen(walletId)
    const response = await handleDeleteWallet(walletId)
    const isTheCurrentWallet = walletId === currentWallet.id ? true : false
      if(response && isTheCurrentWallet) {
        Alert.alert('Sucesso', 'Sua carteira foi deletada com sucesso!', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('Home')
            }
          }
        ])
      }else if(response && !isTheCurrentWallet) {
        Alert.alert('Sucesso', 'Sua carteira foi deletada com sucesso!')
      }else {
        Alert.alert('Erro', 'Houve um erro ao deletar a carteira, tente novamente')
      }
  }

  function openConfirmDeleteDialog(walletId: string) {
    Alert.alert('Deletar Carteira', 'Todos os dados dessa carteita serão perdidos. Tem certeza que deseja continuar? ', [
      {
        text: "Sim", 
        onPress: () => {
          handleDelete(walletId)
        },
      },
      {
        text: "Não",
      }
    ])
  }

  return (
    <View  
      style={styles.container}
    >
      <HeaderNavigation title="Minhas Carteiras" icon={<PlusCircle size={28} color={THEME.colors.white} />} handleFunction={handleGoToCreateWalletScreen} />
      {
        allMyWallets.length > 0 
        ? (
          <ScrollView 
            style={styles.content}
            contentContainerStyle={{
              paddingBottom: 30
            }}
          >
            <Transitioning.View
              ref={ref}
              transition={transition}
            >
              {
                allMyWallets.map(item => (
                  <Animated.View
                    exiting={FadeOut.duration(200)}
                    key={item.id} style={styles.buttonContainer}>
                    <TouchableOpacity
                      
                        onPress={() => handleOpenWalletInfo(item.id)}
                        activeOpacity={1} 
                        style={styles.button}>
                            <View style={{flexDirection: "row", alignItems: 'center'}}>
                              <View>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.date}>05/08/2022</Text>
                              </View>
                            </View>
                            <View>
                              <CaretDown size={28} color={THEME.colors.white} />
                            </View>
                      </TouchableOpacity>
                      {
                        currentOpen === item.id && (
                          <Animated.View
                            // exiting={SlideOutLeft}
                            style={styles.hiddenContent}
                          >
                          <View style={[styles.dataInfoContainer, {marginBottom: 20}]}>
                            <View>
                                <Text style={styles.dataInfoTitle}>Receita Atual:</Text>
                                <Text style={styles.dataInfoText}>R${listWalletInformation.length > 0 ? formatPriceValue(String(listWalletInformation?.find(wallet => wallet.id === item.id).totalIncome)).replace('.', ',') : '0,00'}</Text>
                              </View>
                              <View style={{left: -17}}>
                                <Text style={styles.dataInfoTitle}>Despesa Atual:</Text>
                                <Text style={styles.dataInfoText}>R${listWalletInformation.length > 0 ? formatPriceValue(String(listWalletInformation?.find(wallet => wallet.id === item.id).totalSpending)).replace('.', ',') : '0,00'}</Text>
                              </View>
                          </View>
                            <View style={styles.dataInfoContainer}>
                              <View>
                                <Text style={styles.dataInfoTitle}>Meta de Receita:</Text>
                                <Text style={styles.dataInfoText}>R${item.minIncome ? formatPriceValue(String(item.minIncome)).replace('.', ',') : '0,00'}</Text>
                              </View>
                              <View>
                                <Text style={styles.dataInfoTitle}>Despesa Máxima:</Text>
                                <Text style={styles.dataInfoText}>R${item.maxSpend ? formatPriceValue(String(item.maxSpend)).replace('.', ',') : '0,00'}</Text>
                              </View>
                            </View>
                            <View style={styles.actionButtons}>
                              <View style={styles.actionButtonContainer}>
                                <ButtonWithoutIcon handleFunction={() => openConfirmDeleteDialog(item.id)} bg="#e51c44" title="Deletar" />
                              </View>
                              <View style={styles.actionButtonContainer}>
                                <ButtonWithoutIcon handleFunction={() => handleGoToEditWalletScreen(item)} bg="#ffa000" title="Editar" />
                              </View>
                            </View>
                          </Animated.View>
                        )
                      }
                  </Animated.View>
                ))
              }
            </Transitioning.View>
          </ScrollView>
        )
        : (
           (
            <Text style={{marginTop: 20, textAlign: 'center', fontSize: 13, color: THEME.colors.gray[500]}}>Oops! Parece que você ainda não possui uma carteira!</Text>
          )
        )
      }

     </View>
  )
}