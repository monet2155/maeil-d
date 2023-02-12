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
import { User } from "src/@types/user";

export const databaseRef = collection(database, "users");

export function getUserDetail(uid: string) {
  let currentField = doc(database, "users", uid);
  return getDoc(currentField);
}

export function checkUserNameExist(userName: string) {
  const q = query(databaseRef, where("displayName", "==", userName));
  return getDocs(q);
}

export function createUser(user: User) {
  let { uid, ...userWithoutUid } = user;

  return setDoc(doc(databaseRef, user.uid), userWithoutUid);
}
