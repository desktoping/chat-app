export const NewMessageNotification = () => {
  return (
    <div
      style={{ position: "fixed", bottom: 95, width: "100%", textAlign: "center", cursor: "pointer" }}
      onClick={() => document.getElementById("#message-end")?.scrollIntoView({ behavior: "smooth" })}
    >
      New Message
    </div>
  );
};
