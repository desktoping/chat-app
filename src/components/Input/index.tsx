import { addDoc, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { UserContext } from "../../providers/user";
import { sanitizeMessage } from "../../util";
import { dbMessageRef } from "../../util/firebase";
import "./input.css";

interface ChatInputProps {
  readonly handleScroll: () => void;
}

export const ChatInput = ({ handleScroll }: ChatInputProps) => {
  const [message, setMessage] = useState<string>("");
  const { author, authorId } = useContext(UserContext);

  const inputRef = useRef<HTMLInputElement>();

  const sendMessageHandler = async () => {
    if (!message.trim().length) return;

    await addDoc(dbMessageRef, {
      text: sanitizeMessage(message),
      createdAt: serverTimestamp(),
      author,
      authorId,
    });

    setMessage("");
    handleScroll();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="send-message">
      <InputEmoji
        ref={inputRef}
        value={message}
        onEnter={sendMessageHandler}
        onChange={setMessage}
        placeholder="Press Enter key to send"
        shouldReturn
        shouldConvertEmojiToImage={false}
      />
    </div>
  );
};

export default ChatInput;
