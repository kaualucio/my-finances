import moment from 'moment';
import React, { useMemo } from 'react'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import Wallet from "../databases/sqlite/services/Wallet";

export interface TypeBudget {
  id: string,
  name: string,
  walletId: string,
  value: number,
  type: 'income' | 'spending',
  description: string,
  created_at: number,
  updated_at: number,
}

export interface Wallet {
  id: string,
  name: string,
  created_at: number,
  updated_at: number,
}

interface WalletsContextProps {
  totalBudget: any,
  isLoading: boolean,
  refetchHistory: boolean,
  isLoadingChangeWalletData: boolean,
  currentWallet: Wallet,
  allMyWallets: Wallet[],
  allWalletHistory: TypeBudget[],
  lastActivityInCurrentWallet: TypeBudget[],
  handleRefetchData: () => void,
  handleRefetchHistory: () => void,
  handleRefetchDataWallet: (value: boolean) => void,
  handleSortDataStatistics: () => any,
  handleDeleteItem: (itemType: string, itemId: string) => void,
  handleChangeCurrentWallet: (walletId: string) => void
}

const WalletsContext = createContext({} as WalletsContextProps)

function WalletContextProvider({children}: PropsWithChildren) {
  const [isLoadingChangeWalletData, setIsLoadingChangeWalletData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [refetchHistory, setRefetchHistory] = useState(true)
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null)
  const [allMyWallets, setAllMyWallets] = useState<Wallet[]>([])
  const [allWalletHistory, setAllWalletHistory] = useState<TypeBudget[]>([])
  const [lastActivityInCurrentWallet, setLastActivityInCurrentWallet] = useState<TypeBudget[]>([])
  const totalBudget = useMemo(() => handleGetTotalBudgetBalance(), [allWalletHistory])

  function handleChangeCurrentWallet(walletId: string) {
    let newCurrentWallet = allMyWallets.find(wallet => wallet.id === walletId)
    setCurrentWallet(newCurrentWallet)
    setRefetchHistory(true)
    handleRefetchDataWallet(true)
  }

  useEffect(() => {
    if(isLoading && !currentWallet || isLoading && currentWallet) {
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
      .then((data: TypeBudget[]) => {
        setAllWalletHistory(data)
        setLastActivityInCurrentWallet(data.slice(0, 3))
        setRefetchHistory(false)
      })
    }
  }, [currentWallet, refetchHistory])

  function handleRefetchDataWallet(value: boolean) {
    setIsLoadingChangeWalletData(value)
    setTimeout(() => {
      setIsLoadingChangeWalletData(false)
    }, 500)
  }

  function handleRefetchData() {
    setIsLoading(true)
  }

  function handleRefetchHistory() {
    setRefetchHistory(true)
  }

  function handleSortDataStatistics() {
    let sortedData = {
      incomes: [],
      spendings: []
    }

    allWalletHistory.map(data => {
      if(data.type === 'income') {
        sortedData['incomes'].push({ value: data.value, date: moment(data.created_at).format("MMM")})
      }else if(data.type === 'spending') {
        sortedData['spendings'].push({ value: data.value, date: moment(data.created_at).format("MMM") })
      }
    })

    return sortedData
  }

  function handleGetTotalBudgetBalance() {
    let totalBudgetData = {
      totalIncomeValue: 0,
      totalSpendingValue: 0
    }

    allWalletHistory.map(data => {
      if(data.type === 'income') {
        totalBudgetData['totalIncomeValue'] += data.value
      }else if(data.type === 'spending') {
        totalBudgetData['totalSpendingValue'] += data.value
      }
    })

    return totalBudgetData
  }

  async function handleDeleteItem(itemType: string, itemId: string) {
    try {
      let table = itemType === 'income' ? 'incomes' :'spendings'
      await Wallet.deleteItemFromWallet(table, itemId)
      handleRefetchHistory()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <WalletsContext.Provider value={{
      totalBudget,
      isLoading,
      refetchHistory,
      isLoadingChangeWalletData,
      allMyWallets,
      currentWallet,
      allWalletHistory,
      lastActivityInCurrentWallet,
      handleRefetchData,
      handleRefetchHistory,
      handleRefetchDataWallet,
      handleSortDataStatistics,
      handleDeleteItem,
      handleChangeCurrentWallet,
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