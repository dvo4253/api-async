import express from 'express';
import mysql from 'mysql';
import { QUERY_MAX_PER_PAGE } from '../constants';
import { getConnection, executeQuery } from '../../utils/index';
import { getEmployeesByDeptQuery } from './queries';

const apiRouter = express.Router();

apiRouter.get('/employees', (req, res) => {

  let dbRequest = () => { }
  let dbRequestParams = {};

  const { perPage, page, dept } = req.query;


  if (perPage && page) {
    dbRequest = getEmployees;
    dbRequestParams = { perPage, page };
  }
  else if (dept) {
    dbRequest = getEmployeesByDept
    dbRequestParams = { dept }
  }
  else {

  }
  dbRequest(dbRequestParams)
    .then(results => {

      res.status(200).send(results);
    })
    .catch(error => {
      console.log(error)
      res.status(error.status).json(error)
    })


});

const getEmployees = (params) => {
  return new Promise((resolve, reject) => {
    const { perPage, page } = params;
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

const getEmployeesByDept = async (params) => {
  try {
    const { dept } = params
    const connection = await getConnection();
    const queryParams = ['2018-07-03', '2018-07-03', '2018-07-03', '2018-07-03', '2018-07-03', '2018-07-03', dept]
    return await executeQuery(connection, getEmployeesByDeptQuery, queryParams)

  }
  catch (error) {
    throw new Error(error);
  }
}

export default apiRouter;
