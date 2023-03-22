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
import { Report, ReportCategory } from "src/@types/report";

const reportDatabaseRef = collection(database, "reports");
const categoryDatabaseRef = collection(database, "category_report");

// get report category list
export function getReportCategoryList() {
  return getDocs(categoryDatabaseRef);
}

export function sendReport(report: Report) {
  return addDoc(reportDatabaseRef, report);
}
