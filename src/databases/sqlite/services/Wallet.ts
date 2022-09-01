import { db } from './../';
import uuid from 'react-native-uuid';

interface Wallet {
  name: string,
  description?: string
}


function create(data: Wallet): Promise<boolean | Error> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO wallets (id, name, description, created_at, updated_at) values(?, ?, ?, ?, ?)
      `, 
        [String(uuid.v4()), data.name, data.description, Date.now(), Date.now()],
        (txObj, resultSet) => {
          resolve(true)
        },
        (txObj, error): any => {
          console.log('Error', error)
          reject(error)
        })
    })
  })
}

function findAll() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM wallets ORDER BY created_at ASC`, 
        [],
        (txObj, resultSet) => {
          resolve(resultSet.rows._array)
        },
        (txObj, error): any => {
          console.log('Error', error)
          reject(error)
        })
    })
  })
}

function deleteAll(): Promise<boolean | Error> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`DELETE FROM wallets`, 
        [],
        (txObj, resultSet) => {
          resolve(true)
        },
        (txObj, error): any => {
          console.log('Error', error)
          reject(error)
        })
    })
  })
}

function getLastDataAddedInWallet(walletId: string) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM incomes WHERE walletId = ? UNION SELECT * FROM spendings WHERE walletId = ? ORDER BY created_at DESC LIMIT 3 `,
        [walletId, walletId],
        (txObj, resultSet) => {
          resolve(resultSet.rows._array)
        },
        (txObj, error): any => {
          console.log('Error', error)
          reject(error)
        })
    })
  })
}

export default {
  create,
  findAll,
  deleteAll,
  getLastDataAddedInWallet,
}