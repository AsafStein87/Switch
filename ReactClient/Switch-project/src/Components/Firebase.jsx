import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAKgwFcCc12x5bYFJNLEz1H6OAtEo7Ob34",
  authDomain: "switch-1ca50.firebaseapp.com",
  projectId: "switch-1ca50",
  storageBucket: "switch-1ca50.appspot.com",
  messagingSenderId: "434031907290",
  appId: "1:434031907290:web:e7a30dc56b8607a6f430e3",
  measurementId: "G-3HRQBCHLBV"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
