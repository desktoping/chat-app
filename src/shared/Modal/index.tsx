import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../providers/user";
import { Flex } from "../Flex";
import "./modal.css";

// Native browser modal implementation
export const UsernameModal = () => {
  const { author, setAuthor } = useContext(UserContext);
  const [value, setValue] = useState("");
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!author) {
      modalRef.current?.showModal();
      return;
    }

    modalRef.current?.close();
  }, [author]);

  return (
    <dialog className="modal" ref={modalRef}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Flex style={{ flexDirection: "column", gap: 20 }}>
          <h4>Nominate a name to chat with others</h4>
          <input
            type="text"
            className="name-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            placeholder="Name"
          />
          <button type="submit" className="name-button" onClick={() => setAuthor(value)}>
            Set Name
          </button>
        </Flex>
      </form>
    </dialog>
  );
};
