import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const { value } = req.body;
  await admin.firestore().collection('readings').add({ value, time: new Date() });
  res.status(200).json({ ok: true });
}
