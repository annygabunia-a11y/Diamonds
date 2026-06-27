import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0739068504",
  appId: "1:265360884956:web:eb0c5e120bfbc672a2a019",
  apiKey: "AIzaSyBHxjU79bgq2UGdFF-84hHrSP9_aj6kNac",
  authDomain: "gen-lang-client-0739068504.firebaseapp.com",
  storageBucket: "gen-lang-client-0739068504.firebasestorage.app",
  messagingSenderId: "265360884956",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-2db4bc75-4a9f-44d9-b880-f269ad3c2df1");
