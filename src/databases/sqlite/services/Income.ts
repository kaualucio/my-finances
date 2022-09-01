import { db } from './../';
import uuid from 'react-native-uuid';

interface Income {
  name: string,
  walletId: string,
  value: string,
  description?: string,
}


function create(data: Income): Promise<boolean | Error> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO incomes (id, name, walletId, value, type, description, created_at, updated_at) values(?, ?, ?, ?, ?, ?, ?, ?)
      `, 
        [String(uuid.v4()), data.name, data.walletId, data.value, 'income', data.description, Date.now(), Date.now()],
        (txObj, resultSet) => {
          resolve(true)
        },
        (txObj, error): any => {
          console.log('Error', error)
          reject(false)
        })
    })
  })
}

function findAll() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM incomes ORDER BY created_at DESC`, 
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
      tx.executeSql(`SELECT * FROM incomes WHERE walletId = ? ORDER BY created_at DESC`, 
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
      tx.executeSql(`DELETE FROM incomes`, 
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