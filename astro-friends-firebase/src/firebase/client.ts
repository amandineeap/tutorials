import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDfD0NiYdRJEHNcffVCSLnnZfepY_l-CSk",
  authDomain: "tuto-astro-friends.firebaseapp.com",
  projectId: "tuto-astro-friends",
  storageBucket: "tuto-astro-friends.firebasestorage.app",
  messagingSenderId: "776031414615",
  appId: "1:776031414615:web:d53b3a6b57a484bf71f612"
};

export const app = initializeApp(firebaseConfig);