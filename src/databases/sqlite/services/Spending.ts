import { db } from './../';
import uuid from 'react-native-uuid';

interface Spending {
  name: string,
  walletId: string,
  value: string,
  description?: string,
}


function create(data: Spending): Promise<boolean | Error> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO spendings (id, name, walletId, value, type, description, created_at, updated_at) values(?, ?, ?, ?, ?, ?, ?, ?)
      `, 
        [String(uuid.v4()), data.name, data.walletId, data.value, 'spending', data.description, Date.now(), Date.now()],
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
      tx.executeSql(`SELECT * FROM spendings ORDER BY created_at DESC`, 
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

function findAllByWalletId(walletId: string) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM spendings WHERE walletId = ? ORDER BY created_at DESC`, 
        [walletId],
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
      tx.executeSql(`DELETE FROM spendings`, 
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

export default {
  create,
  findAll,
  findAllByWalletId,
  deleteAll,
}