import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { getFirstItem } from "../../util";
import ChatInput from "../Input";
import { Message } from "../Message";
import { NewMessageNotification } from "../Notification";
import "./chat.css";

export const ChatBox = () => {
  const [lastViewedMessage, setLastViewedMessage] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // const q = query(dbMessageRef, orderBy("createdAt", "desc"), limit(10));
  // const [snapshot, loading] = useCollection(q);

  const [data, loading, more, hasMore] = usePagination();

  useEffect(() => {
    if (!lastViewedMessage) {
      setLastViewedMessage(getFirstItem(data)?.id ?? "");
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  const lastMessageId = useMemo(() => getFirstItem(data)?.id ?? "", [data]);

  const handleScrollToLatestMessage = useCallback(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    setLastViewedMessage(lastMessageRef.current?.id ?? "");
  }, [lastMessageRef]);

  return (
    <main>
      <div className="messages-container">
        <div style={{ textAlign: "center" }}>
          {loading && <div>Loading</div>}
          {hasMore && !loading && <button onClick={more}>Load More</button>}
        </div>
        {[...data].reverse().map((d) => (
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
