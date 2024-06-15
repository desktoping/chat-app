import { ForwardedRef, forwardRef, useContext } from "react";
import { UserContext } from "../../providers/user";
import "./message.css";

interface MessageProps {
  readonly message: string;
  readonly author: string;
  readonly authorId: string;
  readonly messageId: string;
}

export const Message = forwardRef(
  ({ message, author, authorId, messageId }: MessageProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { authorId: userAuthorId } = useContext(UserContext);

    return (
      <div
        id={messageId}
        ref={ref}
        className={`chat-item ${authorId.toString() === userAuthorId.toString() ? "right" : ""}`}
      >
        <div className="chat-item__right">
          <p className="chat-item__user">{author}</p>
          <p className="chat-item__message">{message.split("<br />").join("\n")}</p>
        </div>
      </div>
    );
  }
);
