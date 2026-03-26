// api/data.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const FIREBASE_URL = "https://mydata22-732af-default-rtdb.firebaseio.com/data.json";

    try {
      const response = await fetch(FIREBASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      res.status(200).json({ success: true, firebase: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
