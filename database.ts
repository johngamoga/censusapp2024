import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occupation: string,
  date: string; // Consider using a Date type depending on your date format
  gender: string;
  relation: string;
  province: string;
  district: string;
  locallevelgovernment: string;
  ward: string;
}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      occupation TEXT NOT NULL,
      date TEXT NOT NULL,
      gender TEXT NOT NULL,
      relation TEXT NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      locallevelgovernment TEXT NOT NULL
      ward TEXT NOT NULL
    );
  `);
};

export const addPerson = async (firstName: string, lastName: string, phone: string, email: string, occupation: string, date: string, gender: string, relation: string, province: string, district: string, locallevelgovernment: string, ward: string) => {
  try {
    const result = await db.runAsync('INSERT INTO person (firstName, lastName, phone, email, occupation, date, gender, relation, province, district, locallevelgovernment, ward) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', firstName, lastName, phone, email, occupation, date, gender, relation, province, district, locallevelgovernment, ward);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

export const updatePerson = async (id: number, firstName: string, lastName: string, phone: string, email: string, occupation: string, date: string, gender: string, relation: string, province: string, district: string, locallevelgovernment: string, ward: string) => {
  try {
    await db.runAsync('UPDATE person SET firstName = ?, lastName = ?, phone = ?, email = ?, occupation = ?, date = ?, gender = ?, relation = ?, province = ?, district, = ?, locallevelgovernment = ?, ward = ?, WHERE id = ?', firstName, lastName, phone, email, occupation, date, gender, relation, province, district, locallevelgovernment, ward, id);
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};
