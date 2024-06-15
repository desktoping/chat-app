import { DocumentData, Timestamp } from "firebase/firestore";

export interface Message extends DocumentData {
  text: string;
  author: string;
  authorId: string;
  createdAt: Timestamp;
}
