// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import Cors from 'cors'
import initMiddleware from '../initMiddleware'
import NextCors from 'nextjs-cors';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET'],
  })
)

export default async function helloAPI(req, res) {

  // await cors(req, res)

  const { origin, destination } = req.query;

  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'GET') {
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GMAPS_KEY}&units=imperial`;
      const axiosRes = await axios.get(url)
      res.status(200).json({ data: axiosRes.data });
    } catch (error) {
      res.status(500).json({ data: error });
    }

  }

}
