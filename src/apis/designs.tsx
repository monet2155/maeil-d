import { database } from "@utils/firebase";
import {
  QueryConstraint,
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Design } from "src/@types/design";

export const databaseRef = collection(database, "designs");

export function subscribeDesignCount(callback: (count: number) => void) {
  return onSnapshot(collection(database, "designs"), (snapshot) => {
    callback(snapshot.size);
  });
}

export function getDesignList(orderByList: "recent") {
  const queries = [where("isPublic", "==", true)] as QueryConstraint[];

  if (orderByList === "recent") {
    queries.push(orderBy("createdDate", "desc"));
  }

  const queryRef = query(databaseRef, ...queries);
  return getDocs(queryRef);
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

export async function getDesignCountByThemeId(
  themeId: string
): Promise<number> {
  const count = await getCountFromServer(
    query(
      databaseRef,
      where("themeId", "==", themeId),
      where("isPublic", "==", true)
    )
  );

  return count.data().count;
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
