import { database } from "@utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Topic } from "src/@types/topic";

export const databaseRef = collection(database, "topics");

export function addTopic({ name }: Topic) {
  return addDoc(databaseRef, {
    name: name,
  });
}

export function getTopicList() {
  return getDocs(databaseRef);
}

export function getTopicDetail(id: string) {
  let currentField = doc(database, "topics", id);
  return getDoc(currentField);
}

export function updateTopic(id: string, { name }: Topic) {
  let fieldToEdit = doc(database, "topics", id);

  return updateDoc(fieldToEdit, {
    name: name,
  });
}

export function deleteTopic(id: string) {
  let fieldToEdit = doc(database, "topics", id);

  return deleteDoc(fieldToEdit);
}
