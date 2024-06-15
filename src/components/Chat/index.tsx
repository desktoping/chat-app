import { limit, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirstItem } from "../../util";
import { dbMessageRef } from "../../util/firebase";
import ChatInput from "../Input";
import { Message } from "../Message";
import { NewMessageNotification } from "../Notification";
import "./chat.css";

export const ChatBox = () => {
  const [lastViewedMessage, setLastViewedMessage] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const q = query(dbMessageRef, orderBy("createdAt", "desc"), limit(10));
  const [snapshot, loading] = useCollection(q);

  useEffect(() => {
    if (!lastViewedMessage) {
      setLastViewedMessage(getFirstItem(snapshot?.docs)?.id ?? "");
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [snapshot]);

  const messages = useMemo(() => {
    return snapshot?.docs.reverse().map((d) => ({ ...d.data(), id: d.id })) ?? [];
  }, [snapshot?.docs]);

  const lastMessageId = useMemo(() => getFirstItem(snapshot?.docs)?.id ?? "", [snapshot?.docs]);

  const handleScrollToLatestMessage = useCallback(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    setLastViewedMessage(lastMessageRef.current?.id ?? "");
  }, [lastMessageRef]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="messages-container">
        {messages.map((d) => (
          <Message
            key={d.id}
            message={d.text}
            author={d.author}
            authorId={d.authorId}
            messageId={d.id}
            ref={lastMessageId === d.id ? lastMessageRef : null}
          />
        ))}
      </div>
      <ChatInput handleScroll={handleScrollToLatestMessage} />
      {lastViewedMessage != lastMessageId && <NewMessageNotification handleScroll={handleScrollToLatestMessage} />}
    </main>
  );
};
