import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, value } = req.body;

    // Firebase URLs
    const firebaseCurrentURL = "https://mydata22-732af-default-rtdb.firebaseio.com/data.json";
    const firebaseLogsURL = "https://mydata22-732af-default-rtdb.firebaseio.com/logs.json";

    try {
      // 1. Update Current (PUT)
      await fetch(firebaseCurrentURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, value })
      });

      // 2. Add Logs (POST)
      await fetch(firebaseLogsURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, value, timestamp: Date.now() })
      });

      res.status(200).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  } else {
    res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }
}
