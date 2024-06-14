import { limit, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { UserContext } from "../../providers/user";
import { dbMessageRef } from "../../util/firebase";
import ChatInput from "../Input";
import { MessageHistory } from "../Message";
import { NewMessageNotification } from "../Notification";
import "./chat.css";

const ChatBox = () => {
  const { lastViewed, setLastViewed } = useContext(UserContext);
  const scroll = useRef<HTMLSpanElement>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const q = query(dbMessageRef, orderBy("createdAt", "desc"), limit(10));
  const [snapshot, loading] = useCollection(q);

  useEffect(() => {
    if (!lastViewed) {
      setLastViewed([...(snapshot?.docs ?? [])].pop()?.id ?? "");
    } else {
      setShowNewMessage(lastViewed !== snapshot?.docs[0]?.id);
    }
  }, [snapshot]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="messages-container">
        {snapshot?.docs.reverse().map((d) => {
          const data = d.data();
          return <MessageHistory key={d.id} message={data.text} author={data.author} authorId={data.authorId} />;
        })}
      </div>
      <span id="message-end" ref={scroll} />
      <ChatInput scroll={scroll} />
      {showNewMessage && <NewMessageNotification />}
    </main>
  );
};

export default ChatBox;
