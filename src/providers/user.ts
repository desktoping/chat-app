import { createContext } from "react";
import { v4 } from "uuid";

interface UserContextType {
  author: string;
  authorId: string;
  setAuthor: (author: string) => void;
}

export const UserContext = createContext<UserContextType>({
  author: "default",
  authorId: v4(),
  setAuthor: () => null,
});
