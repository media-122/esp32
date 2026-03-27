export default async function handler(req, res) {

  // Only POST request allow
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {

    const data = req.body;

    // 👇 AAP KA WORKING FIREBASE URL
    const firebaseURL = "https://mydata22-732af.firebaseio.com/data.json";

    const response = await fetch(firebaseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    res.status(200).json({
      success: true,
      firebaseID: result.name
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}
