import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loader: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setLoading(customEvent.detail);
    };

    document.addEventListener("app:loading", handler);
    return () => {
      document.removeEventListener("app:loading", handler);
    };
  }, []);

  return (
    <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1300 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
