import express from 'express';
import { getConnection, executeQuery } from '../../utils/index';

const apiRouter = express.Router();

apiRouter.get('/departments', async (req, res) => {
  try {
    const connection = await getConnection();

    const query = `SELECT * from departments`
    const results = await executeQuery(connection, query)

    return res.status(200).json(results);

  }
  catch (error) {
    return res.status(error.status).json(error.msg);
  }
})


export default apiRouter
