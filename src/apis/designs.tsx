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
import { Design } from "src/@types/design";

export const databaseRef = collection(database, "designs");

export function getDesignListByTopicId(topicId: string) {
  return getDocs(query(databaseRef, where("topicId", "==", topicId)));
}

export function getDesignDetail(id: string) {
  let currentField = doc(database, "designs", id);
  return getDoc(currentField);
}

export function uploadDesign(design: Design) {
  return addDoc(databaseRef, design);
}
