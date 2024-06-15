interface PrimaryButtonProps {
  title: string;
  eventHandler: () => void;
}

export const PrimaryButton = ({ title, eventHandler }: PrimaryButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: "#b4dce7",
        padding: 10,
        outline: "none",
        border: "none",
        borderRadius: 10,
        textTransform: "uppercase",
      }}
      onClick={eventHandler}
    >
      {title}
    </button>
  );
};
