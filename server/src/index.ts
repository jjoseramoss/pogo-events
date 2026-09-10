import express from "express";

const app = express();
const port = 3000;

const url =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json";
app.get("/api/health", (req, res) => {
  // send response
  res.json({ status: "ok" });
});

app.get("/api/events", async (req, res) => {
  // await fetching function
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    res.json(result);
  } catch (err) {
    res.status(502).json({ error: "Unable to retrieve events" });
  }
  // send result using res.json(...)
});
app.listen(port, () => {
  // Log a message confirming server started.
  console.log(`Server running on port: ${port}`);
});
