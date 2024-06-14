import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useSessionStorage = (key: string, initialValue: string): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let v = sessionStorage.getItem(key);

    if (!v || !v.length) {
      sessionStorage.setItem(key, initialValue);
      v = initialValue;
    }

    setValue(v);
  }, []);

  return [value, setValue];
};
