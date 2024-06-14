import { createContext } from "react";
import { v4 } from "uuid";

interface UserContextType {
  name: string;
  id: string;
  setLastViewed: (id: string) => void;
  lastViewed: string;
}

export const UserContext = createContext<UserContextType>({
  name: "default",
  id: v4(),
  lastViewed: "",
  setLastViewed: () => null,
});
