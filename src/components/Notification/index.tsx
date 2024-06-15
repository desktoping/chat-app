import { PrimaryButton } from "../../shared/Button/primary";

interface NewMessageNotificationProps {
  readonly handleScroll: () => void;
}

export const NewMessageNotification = ({ handleScroll }: NewMessageNotificationProps) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 95,
        width: "100%",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <PrimaryButton eventHandler={handleScroll} title="Check new Message" />
    </div>
  );
};
