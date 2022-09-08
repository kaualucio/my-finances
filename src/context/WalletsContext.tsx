import moment from 'moment';
import React, { createContext, useMemo, PropsWithChildren, useContext, useEffect, useState } from "react";
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
  minIncome?: string,
  maxSpend?: string,
  description?: string,
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
  handleChangeCurrentWallet: (walletId: string| null) => void,
  handleDeleteWallet: (walletId: string) => Promise<boolean>,
  getMonetaryWalletInformation: () => any[]
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

  function handleChangeCurrentWallet(walletId: string | null) {
    let newCurrentWallet = allMyWallets.find(wallet => wallet.id === walletId)
    if(newCurrentWallet) {
      setCurrentWallet(newCurrentWallet)
    }else {
      setCurrentWallet(null)
    }
    setRefetchHistory(true)
    handleRefetchDataWallet(true)
  }

  useEffect(() => {
    if(isLoading && !currentWallet || isLoading && currentWallet) {
      Wallet.findAll()
      .then((data: Wallet[]) => {
        setCurrentWallet(data.length > 0 ? data[0] : null)
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

  function getMonetaryWalletInformation() {
    try {
      const sortedList = []
      let totalIncome = 0
      let totalSpending = 0
      allMyWallets.map(async (wallet) => {
        const result = await Wallet.getLastDataAddedInWallet(wallet.id)
        result.map(item => {
            if(item.type === 'income') {
              totalIncome += Number(item.value)
            }else {
              totalSpending += Number(item.value)
            }
        })
        sortedList.push({id: wallet.id, totalIncome, totalSpending})
        totalIncome = 0
        totalSpending = 0
      })

      return sortedList
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteWallet(walletId: string) {
    try {
      await Wallet.deleteById(walletId)

      const updatedWallets = allMyWallets.filter(wallet => wallet.id !== walletId)
      handleChangeCurrentWallet(updatedWallets.length > 0 ? updatedWallets[0].id : null)
      handleRefetchData()
      return true
    } catch (error) {
      console.log(error)
      return false
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
      handleDeleteWallet,
      getMonetaryWalletInformation,
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