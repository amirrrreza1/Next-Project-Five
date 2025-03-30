import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMrXspEHrimICWN9wewDJ0CSTWtU_kgMc",
  authDomain: "error-monitoring-4cb92.firebaseapp.com",
  projectId: "error-monitoring-4cb92",
  storageBucket: "error-monitoring-4cb92.firebasestorage.app",
  messagingSenderId: "931263152723",
  appId: "1:931263152723:web:815dd4d7702ba4d1efbca6",
  measurementId: "G-HH1NN1M20X",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const logErrorToFirebase = async (error: Error, statusCode: number = 500) => {
  try {
    const errorMessage = error?.message || "Unknown error";
    const errorStack = error?.stack || "No stack trace available";
    const timestamp = Timestamp.fromDate(new Date()); // تبدیل به Timestamp Firebase

    await addDoc(collection(db, "errors"), {
      message: errorMessage,
      stack: errorStack,
      statusCode: statusCode,
      timestamp: timestamp,
    });
  } catch (err) {
    console.error("Failed to log error:", err);
  }
};

export const logApiCallToFirebase = async (
  endpoint: string,
  method: string,
  success: boolean,
  timestamp: string
) => {
  try {
    await addDoc(collection(db, "api_logs"), {
      endpoint,
      method,
      success,
      timestamp,
    });
  } catch (error) {
    console.error("Failed to log API call:", error);
  }
};

export { db, logErrorToFirebase };
