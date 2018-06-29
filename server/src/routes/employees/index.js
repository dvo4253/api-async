import express from 'express';
import mysql from 'mysql';
import { QUERY_MAX_PER_PAGE } from '../constants';
const apiRouter = express.Router();

apiRouter.get('/employees', (req, res) => {
  const { perPage, page } = req.query;

  getEmployees(perPage, page)
    .then(results => {

      res.status(200).send({ count: results.length, data: results });
    })
    .catch(error => {
      console.log(error)
      res.status(error.status).json(error)
    })


});

const getEmployees = (perPage, page) => {
  return new Promise((resolve, reject) => {

    const perPageNum = Math.min(parseInt(perPage), QUERY_MAX_PER_PAGE);
    const offSet = perPageNum * page;

    if (Number.isNaN(offSet)) {
      console.log(`perPage: ${perPage}`)
      console.log(`page: ${page}`)
      reject({ status: 400, msg: "Invalid Parameters" });
    }
    else {

      const connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employees'
      });

      connection.connect((err) => {
        if (err) {
          console.error('error connecting: ' + err);
          reject({ status: 401, msg: "Unable to connect to database" });
        }
        else {

          console.log('connected as id ' + connection.threadId);

          const query = `SELECT * from employees LIMIT ${perPageNum} OFFSET ${offSet}`;
          console.log("Query: ", query);
          connection.query(query, function (error, results, fields) {
            if (error) reject(error);
            console.log("I'm in the employees Route")

            connection.end();

            resolve(results);
          })
        }
      });

    }

  })
}



export default apiRouter;
