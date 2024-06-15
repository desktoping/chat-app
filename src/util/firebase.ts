import { initializeApp } from "firebase/app";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  collection,
  getFirestore,
} from "firebase/firestore";
import { Message } from "../types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chat-app-cd694.firebaseapp.com",
  projectId: "chat-app-cd694",
  storageBucket: "chat-app-cd694.appspot.com",
  messagingSenderId: "962812282887",
  appId: "1:962812282887:web:a538fd6f892ffe332942a2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const messageConverted: FirestoreDataConverter<Message> = {
  toFirestore(message: WithFieldValue<Message>): DocumentData {
    return { author: message.author, text: message.text, createdAt: message.createdAt, authorId: message.authorId };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Message {
    const data = snapshot.data(options);
    return {
      author: data.author,
      text: data.text,
      createdAt: data.createdAt,
      authorId: data.authorId,
    };
  },
};

export const dbMessageRef = collection(db, "messages").withConverter(messageConverted);
