import { database } from "@utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { Theme } from "src/@types/theme";

export const databaseRef = collection(database, "themes");

export function addTheme({ name }: Theme) {
  return addDoc(databaseRef, {
    name: name,
  });
}

export function subscribeThemeCount(callback: (count: number) => void) {
  return onSnapshot(collection(database, "themes"), (snapshot) => {
    callback(snapshot.size);
  });
}

export function getThemeList() {
  return getDocs(databaseRef);
}

export function getThemeDetail(id: string) {
  let currentField = doc(database, "themes", id);
  return getDoc(currentField);
}

export function updateTheme(id: string, { name }: Theme) {
  let fieldToEdit = doc(database, "themes", id);

  return updateDoc(fieldToEdit, {
    name: name,
  });
}

export function deleteTheme(id: string) {
  let fieldToEdit = doc(database, "themes", id);

  return deleteDoc(fieldToEdit);
}
