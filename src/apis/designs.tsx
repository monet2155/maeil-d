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
  return onSnapshot(doc(database, "designs"), (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data().count);
    } else {
      callback(0);
    }
  });
}

export function getDesignListByTopicId(topicId: string) {
  return getDocs(query(databaseRef, where("topicId", "==", topicId)));
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
