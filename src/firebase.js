import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBvU-H43u2LHx4HptlUJts7CsB9Lja-wS4",
  authDomain: "r-sell-c0d98.firebaseapp.com",
  projectId: "r-sell-c0d98",
  storageBucket: "r-sell-c0d98.appspot.com",
  messagingSenderId: "764479888397",
  appId: "1:764479888397:web:2bbfc4846749fc29c48944",
  measurementId: "G-JEKQPFGC8E",
};
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const messaging = getMessaging(app);
export const auth = getAuth(app);
