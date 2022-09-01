import React from 'react'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import Wallet from "../databases/sqlite/services/Wallet";
import { Income, useIncome } from './IncomeContext';
import { Spending, useSpending } from './SpendingContext';

export interface Wallet {
  id: string,
  name: string,
  created_at: number,
  updated_at: number,
}

interface WalletsContextProps {
  isLoading: boolean,
  currentWallet: Wallet,
  allMyWallets: Wallet[],
  lastActivityInCurrentWallet: Spending[] | Income[],
  handleRefetchData: () => void,
  handleRefetchHistory: () => void,
  handleChangeCurrentWallet: (walletId: string) => void
}

const WalletsContext = createContext({} as WalletsContextProps)

function WalletContextProvider({children}: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [refetchHistory, setRefetchHistory] = useState(true)
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null)
  const [allMyWallets, setAllMyWallets] = useState<Wallet[]>([])
  const [lastActivityInCurrentWallet, setLastActivityInCurrentWallet] = useState<Spending[] | Income[]>([])

  function handleChangeCurrentWallet(walletId: string) {
    let newCurrentWallet = allMyWallets.find(wallet => wallet.id === walletId)
    setCurrentWallet(newCurrentWallet)
    setRefetchHistory(true)
  }

  useEffect(() => {
    if(isLoading) {
      Wallet.findAll()
      .then(data => {
        setCurrentWallet(data[0])
        setAllMyWallets(data as Wallet[])
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
    }
  }, [isLoading])

  useEffect(() => { 
    if(currentWallet && refetchHistory) {
      Wallet.getLastDataAddedInWallet(currentWallet.id)
      .then(data => {
        setLastActivityInCurrentWallet(data as Spending[] | Income[])
        setRefetchHistory(false)
      })
    }
  }, [currentWallet, refetchHistory])

  // useEffect(() => {
  //     Wallet.deleteAll()
  //     .then(data => {
        
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => setIsLoading(false))
  // }, [])

  function handleRefetchData() {
    setIsLoading(true)
  }

  function handleRefetchHistory() {
    setRefetchHistory(true)
  }

  return (
    <WalletsContext.Provider value={{
      isLoading,
      allMyWallets,
      currentWallet,
      lastActivityInCurrentWallet,
      handleRefetchData,
      handleRefetchHistory,
      handleChangeCurrentWallet
    }}>
      {children}
    </WalletsContext.Provider>
  )
} 

function useWallet() {
  const context = useContext(WalletsContext)

  return context
}

export { useWallet, WalletContextProvider }