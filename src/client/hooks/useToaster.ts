import { useState, useCallback } from "react";
import { Severity } from "../type/SeverityEnum";

export function useToaster() {
  const [toaster, setToaster] = useState({
    open: false,
    message: "",
    severity: Severity.Success,
  });

  const showToaster = useCallback(
    (message: string, severity: Severity = Severity.Success) => {
      setToaster({ open: true, message, severity });
    },
    []
  );

  const closeToaster = useCallback(() => {
    setToaster((prev) => ({ ...prev, open: false }));
  }, []);

  return { toaster, showToaster, closeToaster };
}
