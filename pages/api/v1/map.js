// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function helloAPI(req, res) {
  // res.status(200).json({ name: 'John Doe' })

  const { origin, destination } = req.query;

  if (req.method === 'GET') {
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyDWc6-894y_DJCewhixQE2FGVJNsft2_I8&units=imperial`;
      const axiosRes = await axios.get(url)
      res.status(200).json({ data: axiosRes.data });
    } catch (error) {
      res.status(500).json({ data: error });
    }

  }

}
