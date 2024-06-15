import sanitize from "sanitize-html";

export const sanitizeMessage = (message: string) => {
  return sanitize(message);
};

export const valueOrDefault = (v: string | null, d: string) => {
  return v && v.length ? v : d;
};

export const getLastItem = <T>(arr?: T[] | null) => (Array.isArray(arr) && arr.length ? arr.pop() : null);

export const getFirstItem = <T>(arr?: T[] | null) => (Array.isArray(arr) && arr.length ? arr.shift() : null);
