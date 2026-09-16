import express from "express";
import path from "node:path";
import { getEventData } from "./services/events.js";
import { fileURLToPath } from "node:url";
const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/api/health", (req, res) => {
  // send response
  res.json({ status: "ok" });
});

app.get("/api/events", async (req, res) => {
  // await fetching function
  try {
    const events = await getEventData();
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(502).json({ error: "Unable to retrieve events" });
  }
  // send result using res.json(...)
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found" });
}); // Close the API handler here.

const clientDist = fileURLToPath(
  new URL("../../client/dist/", import.meta.url),
);

app.use(express.static(clientDist));

app.get("/{*path}", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  // Log a message confirming server started.
  console.log(`Server running on port: ${port}`);
});
