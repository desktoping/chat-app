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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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
