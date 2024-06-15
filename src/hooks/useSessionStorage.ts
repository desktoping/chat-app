import { useState } from "react";
import { valueOrDefault } from "../util";

export const useSessionStorage = (key: string, initialValue: string): [string, (v: string) => void] => {
  const [value, setValue] = useState(valueOrDefault(sessionStorage.getItem(key), initialValue));

  // @NOTE - This does not ensure data accuracy because session storage can be changed using different method
  // so this wont be able to pick up the change
  // This is enough for this project though
  const setSessioNValue = (v: string) => {
    sessionStorage.setItem(key, v);
    setValue(v);
  };

  return [value, setSessioNValue];
};
