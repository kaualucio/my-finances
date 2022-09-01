import React from 'react'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import Income from '../databases/sqlite/services/Income';
import Spending from '../databases/sqlite/services/Spending';
import { useWallet } from './WalletsContext';

export interface Spending {
  id: string,
  name: string,
  walletId: string,
  value: number,
  type: 'income' | 'spending',
  description: string,
  created_at: number,
  updated_at: number,
}

interface SpendingsContextProps {
  isLoading: boolean,
  currentSpending: Spending,
  allMySpendings: Spending[],
  totalSpendingValue: number,
  handleRefetchDataSpending: () => void,
  handleChangeCurrentSpending: (SpendingId: string) => void
}

const SpendingsContext = createContext({} as SpendingsContextProps)

function SpendingContextProvider({children}: PropsWithChildren) {
  const {currentWallet} = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const [currentSpending, setCurrentSpending] = useState<Spending | null>(null)
  const [allMySpendings, setAllMySpendings] = useState<Spending[]>([])
  const [totalSpendingValue, setTotalSpendingValue] = useState(0)


  function handleChangeCurrentSpending(spendingId: string) {
    let newCurrentSpending = allMySpendings.find(spending => spending.id === spendingId)
    setCurrentSpending(newCurrentSpending)
  }

  useEffect(() => {
    if(currentWallet) {
      if(isLoading) {
        Spending.findAllByWalletId(currentWallet?.id)
        .then(data => {
          setCurrentSpending(data[0])
          setAllMySpendings(data as Spending[])
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
      }
    }
  }, [isLoading, currentWallet])

  useEffect(() => {
    let totalSpending = 0
    allMySpendings.map(spending => totalSpending += Number(spending.value))
    setTotalSpendingValue(totalSpending)
  }, [allMySpendings])

  // useEffect(() => {
  //     Spending.deleteAll()
  //     .then(data => {
        
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => setIsLoading(false))
  // }, [])

  function handleRefetchDataSpending() {
    setIsLoading(true)
  }

  return (
    <SpendingsContext.Provider value={{
      isLoading,
      allMySpendings,
      currentSpending,
      totalSpendingValue,
      handleRefetchDataSpending,
      handleChangeCurrentSpending
    }}>
      {children}
    </SpendingsContext.Provider>
  )
} 

function useSpending() {
  const context = useContext(SpendingsContext)

  return context
}

export { useSpending, SpendingContextProvider }