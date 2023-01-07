import { database } from "@utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const databaseRef = collection(database, "designs");

export function getDesignListByTopicId(topicId: string) {
  return getDocs(query(databaseRef, where("topicId", "==", topicId)));
}

export function getDesignDetail(id: string) {
  let currentField = doc(database, "designs", id);
  return getDoc(currentField);
}
