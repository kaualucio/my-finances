import { Wallet } from "../context/WalletsContext";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined,
      Historic: undefined,
      NewWallet: undefined,
      EditWallet: any,
      NewData: undefined,
      AllMyWallets: undefined
    }
  }
}