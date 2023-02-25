import { database } from "@utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Design } from "src/@types/design";

export const databaseRef = collection(database, "designs");

export function subscribeDesignCount(callback: (count: number) => void) {
  return onSnapshot(collection(database, "designs"), (snapshot) => {
    callback(snapshot.size);
  });
}

export function getDesignListByThemeId(themeId: string) {
  return getDocs(
    query(
      databaseRef,
      where("themeId", "==", themeId),
      where("isPublic", "==", true)
    )
  );
}

export function getDesignListByUserId(userId: string) {
  return getDocs(query(databaseRef, where("userId", "==", userId)));
}

export function getDesignDetail(id: string) {
  let currentField = doc(database, "designs", id);
  return getDoc(currentField);
}

export function uploadDesign(design: Design) {
  return addDoc(databaseRef, design);
}
