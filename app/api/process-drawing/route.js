import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { drawing } = req.body;

    try {
      const response = await axios.post(
        'https://api.mathpix.com/v3/text',
        { src: drawing, formats: ['latex'] },
        {
          headers: {
            'Content-Type': 'application/json',
            'app_id': process.env.MATHPIX_APP_ID,
            'app_key': process.env.MATHPIX_APP_KEY,
          },
        }
      );

      res.status(200).json({ latex: response.data.latex });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process equation' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
