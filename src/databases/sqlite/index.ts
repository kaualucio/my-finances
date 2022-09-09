import * as SQLite from 'expo-sqlite';

const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("db.budgetapp") ,
};

export const db = DatabaseConnection.getConnection()
db.exec([{ sql: "PRAGMA foreign_keys=ON;", args: [] }], false, () => {})