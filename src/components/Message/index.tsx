import { useContext } from "react";
import { UserContext } from "../../providers/user";
import "./message.css";

interface MessageHistoryProps {
  message: string;
  author: string;
  authorId: string;
}

export const MessageHistory = ({ author, message, authorId }: MessageHistoryProps) => {
  const { id } = useContext(UserContext);

  return (
    <div className={`chat-item ${authorId.toString() === id.toString() ? "right" : ""}`}>
      <div className="chat-item__right">
        <p className="chat-item__user">{author}</p>
        <p className="chat-item__message">{message.split("<br />").join("\n")}</p>
      </div>
    </div>
  );
};
