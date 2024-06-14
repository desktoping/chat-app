import sanitize from "sanitize-html";

export const sanitizeMessage = (message: string) => {
  return sanitize(message);
};
