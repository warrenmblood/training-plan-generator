import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "./creds.json";

const firebaseConfig = config;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;