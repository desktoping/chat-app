import { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import ChatBox from "./components/Chat";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { UserContext } from "./providers/user";
import { Flex } from "./shared/Flex";

function App() {
  const [user, setUser] = useSessionStorage("user", "");
  const [id] = useSessionStorage("sessionId", v4());
  const [lastViewed, setLastViewed] = useState("");

  return (
    <UserContext.Provider value={{ name: user, id, lastViewed, setLastViewed }}>
      {!user && <div>Type a username</div>}
      <Flex style={{ flexDirection: "column" }}>
        <ChatBox />
      </Flex>
    </UserContext.Provider>
  );
}

export default App;
