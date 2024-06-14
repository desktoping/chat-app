import { addDoc, serverTimestamp } from "firebase/firestore";
import { RefObject, useContext, useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { UserContext } from "../../providers/user";
import { sanitizeMessage } from "../../util";
import { dbMessageRef } from "../../util/firebase";
import "./input.css";

interface ChatInputProps {
  readonly scroll: RefObject<HTMLSpanElement>;
}

export const ChatInput = ({ scroll }: ChatInputProps) => {
  const [message, setMessage] = useState<string>("");
  const { name, id, setLastViewed } = useContext(UserContext);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [scroll.current]);

  const sendMessage = async () => {
    if (!message.trim().length) return;

    const docId = await addDoc(dbMessageRef, {
      text: sanitizeMessage(message),
      createdAt: serverTimestamp(),
      author: name,
      authorId: id,
    });

    scroll.current?.scrollIntoView({ behavior: "smooth" });
    setLastViewed(docId.id);
    setMessage("");
  };

  return (
    <div className="send-message">
      <InputEmoji
        value={message}
        onEnter={sendMessage}
        onChange={setMessage}
        placeholder="Type a message"
        shouldReturn
        height={60}
        shouldConvertEmojiToImage={false}
      />
    </div>
  );
};

export default ChatInput;
