import { database } from "@utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const databaseRef = collection(database, "users");

export function getUserDetail(uid: string) {
  let currentField = doc(database, "users", uid);
  return getDoc(currentField);
}

export function createUser(uid: string, displayName: string) {
  return setDoc(doc(databaseRef, uid), { displayName });
}
