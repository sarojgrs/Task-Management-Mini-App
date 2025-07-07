import { createApp } from "./app";

const PORT = process.env.PORT;

(async () => {
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
