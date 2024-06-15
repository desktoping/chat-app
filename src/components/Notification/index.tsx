interface NewMessageNotificationProps {
  readonly handleScroll: () => void;
}

export const NewMessageNotification = ({ handleScroll }: NewMessageNotificationProps) => {
  return (
    <div
      style={{ position: "fixed", bottom: 95, width: "100%", textAlign: "center", cursor: "pointer" }}
      onClick={handleScroll}
    >
      Check new Message
    </div>
  );
};
