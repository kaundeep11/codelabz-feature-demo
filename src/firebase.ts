import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAeUlAGv7V0bJ0Yp7I8D5mVzE_DhyhGd5g",
  authDomain: "codelabz-feature-demo.firebaseapp.com",
  databaseURL: "https://codelabz-feature-demo-default-rtdb.firebaseio.com",
  projectId: "codelabz-feature-demo",
  storageBucket: "codelabz-feature-demo.firebasestorage.app",
  messagingSenderId: "681645066501",
  appId: "1:681645066501:web:9ae48bfa5a194036cb4f6c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
