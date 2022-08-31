import React from 'react'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import Wallet from "../databases/sqlite/services/Wallet";

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
  handleChangeCurrentWallet: (walletId: string) => void
}

const WalletsContext = createContext({} as WalletsContextProps)

function WalletContextProvider({children}: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null)
  const [allMyWallets, setAllMyWallets] = useState<Wallet[]>([])

  function handleChangeCurrentWallet(walletId: string) {
    let newCurrentWallet = allMyWallets.find(wallet => wallet.id === walletId)
    setCurrentWallet(newCurrentWallet)
  }

  useEffect(() => {
    Wallet.findAll()
    .then(data => {
      console.log(data)
      setCurrentWallet(data[0])
      setAllMyWallets(data as Wallet[])
    })
    .catch(error => console.log(error))
    .finally(() => setIsLoading(false))
  }, [])

  return (
    <WalletsContext.Provider value={{
      isLoading,
      allMyWallets,
      currentWallet,
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