import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARiHmJ0xHl2Ktk5VGU1J3FdlWLGH1imzY",
  authDomain: "pha9-e9aa2.firebaseapp.com",
  projectId: "pha9-e9aa2",
  storageBucket: "pha9-e9aa2.appspot.com",
  messagingSenderId: "984345155360",
  appId: "1:984345155360:web:c7ef3c4927fcf5f664a945"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default app;
export { db};