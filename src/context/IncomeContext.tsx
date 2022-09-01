import React from 'react'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import Income from '../databases/sqlite/services/Income';
import { useWallet } from './WalletsContext';

export interface Income {
  id: string,
  name: string,
  walletId: string,
  value: number,
  type: 'income' | 'spending'
  description: string,
  created_at: number,
  updated_at: number,
}

interface IncomesContextProps {
  isLoading: boolean,
  currentIncome: Income,
  allMyIncomes: Income[],
  totalIncomeValue: number,
  handleRefetchDataIncome: () => void,
  handleChangeCurrentIncome: (IncomeId: string) => void
}

const IncomesContext = createContext({} as IncomesContextProps)

function IncomeContextProvider({children}: PropsWithChildren) {
  const {currentWallet} = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const [currentIncome, setCurrentIncome] = useState<Income | null>(null)
  const [allMyIncomes, setAllMyIncomes] = useState<Income[]>([])
  const [totalIncomeValue, setTotalIncomeValue] = useState(0)

  function handleChangeCurrentIncome(incomeId: string) {
    let newCurrentIncome = allMyIncomes.find(income => income.id === incomeId)
    setCurrentIncome(newCurrentIncome)
  }

  useEffect(() => {
    if(currentWallet) {
      if(isLoading) {
        Income.findAllByWalletId(currentWallet?.id)
        .then(data => {
          setCurrentIncome(data[0])
          setAllMyIncomes(data as Income[])
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
      }
    }
  }, [isLoading, currentWallet])

  useEffect(() => {
    let totalIncome = 0
    allMyIncomes.map(income => totalIncome += Number(income.value))
    setTotalIncomeValue(totalIncome)
  }, [allMyIncomes])

  // useEffect(() => {
  //     Income.deleteAll()
  //     .then(data => {
        
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => setIsLoading(false))
  // }, [])

  function handleRefetchDataIncome() {
    setIsLoading(true)
  }

  return (
    <IncomesContext.Provider value={{
      isLoading,
      allMyIncomes,
      currentIncome,
      totalIncomeValue,
      handleRefetchDataIncome,
      handleChangeCurrentIncome
    }}>
      {children}
    </IncomesContext.Provider>
  )
} 

function useIncome() {
  const context = useContext(IncomesContext)

  return context
}

export { useIncome, IncomeContextProvider }