import { v4 } from "uuid";
import "./App.css";
import { ChatBox } from "./components/Chat";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { UserContext } from "./providers/user";
import { Flex } from "./shared/Flex";
import { UsernameModal } from "./shared/Modal";

function App() {
  const [author, setAuthor] = useSessionStorage("user", "");
  const [id] = useSessionStorage("sessionId", v4());

  return (
    <UserContext.Provider value={{ author: author, setAuthor: setAuthor, authorId: id }}>
      <Flex style={{ flexDirection: "column" }}>
        <ChatBox />
      </Flex>
      <UsernameModal />
    </UserContext.Provider>
  );
}

export default App;
