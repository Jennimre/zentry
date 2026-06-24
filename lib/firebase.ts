import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBcgpwoRRdckxE6hmdoXtD9caVi6EYW6SY",
  authDomain: "zentry-532e9.firebaseapp.com",
  projectId: "zentry-532e9",
  databaseURL: "https://zentry-532e9-default-rtdb.firebaseio.com",
  storageBucket: "zentry-532e9.firebasestorage.app",
  messagingSenderId: "944746460157",
  appId: "1:944746460157:web:eaae25a555f514f3351f94",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);