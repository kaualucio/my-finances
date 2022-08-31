import * as SQLite from 'expo-sqlite';

const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("db.budgetapp"),
};

export const db = DatabaseConnection.getConnection()