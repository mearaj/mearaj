// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzOMv4uXWWvup0qogg3KpucLYgCRusRr4",
  authDomain: "mearaj-6aaef.firebaseapp.com",
  projectId: "mearaj-6aaef",
  storageBucket: "mearaj-6aaef.firebasestorage.app",
  messagingSenderId: "555072909280",
  appId: "1:555072909280:web:39359138511f0ed88e4585",
  measurementId: "G-132RQ3TW84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only call analytics in browsers where it's supported
let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
