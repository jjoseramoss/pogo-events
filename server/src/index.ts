import express from "express";
import { getEventData } from "./services/events.js";

const app = express();
const port = 3000;

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
app.listen(port, () => {
  // Log a message confirming server started.
  console.log(`Server running on port: ${port}`);
});
