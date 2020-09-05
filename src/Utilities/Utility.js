import React, { useState } from "react";
export function CreateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useLocalStorageState(key, defaultValue = "") {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
export function getCurrentTimeStamp() {
  let d = new Date();
  let current_timestamp =
    d.getDate() +
    "-" +
    d.getMonth() +
    "-" +
    d.getFullYear() +
    "_" +
    d.getHours() +
    "_" +
    d.getMinutes() +
    "_" +
    d.getSeconds();
  return current_timestamp;
}
