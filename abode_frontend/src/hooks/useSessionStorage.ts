import { useState } from "react";
import { Token } from "../types";

export const useSessionStorage = (keyName: string, defaultValue: string | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, defaultValue ?? "");
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (token: Token) => {
    try {
      window.sessionStorage.setItem(keyName, token.access_token);
    } catch (err) {
      console.log(err);
    }
    setStoredValue(token.access_token);
  };
  return [storedValue, setValue];
};