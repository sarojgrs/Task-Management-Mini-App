import { useState, useCallback } from "react";

function useToggle<T>(initialValue: T): [T, (value?: T) => void] {
  const [state, setState] = useState<T>(initialValue);

  const toggle = useCallback(
    (value?: T) => {
      if (typeof value === "undefined") {
        if (typeof state === "boolean") {
          setState(!state as unknown as T);
        }
        return;
      }
      setState(value);
    },
    [state]
  );

  return [state, toggle];
}

export default useToggle;
