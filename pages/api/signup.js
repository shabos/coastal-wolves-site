import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, age, parentName, email } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('coastalwolves');
      const collection = db.collection('signups');

      await collection.insertOne({ name, age, parentName, email, timestamp: new Date() });
      res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('MongoDB insert error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}