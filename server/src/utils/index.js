import mysql from 'mysql';
import connectionConfig from './connection.conf';

export const getConnection = () => {

  const connection = mysql.createConnection(connectionConfig);

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err);
        reject({ status: 401, msg: "Unable to connect to database" });
      }

      resolve(connection)

    })
  })
}

export const executeQuery = (connection, query, queryParams) => {

  return new Promise((resolve, reject) => {
    console.log("QUERY: ", query);
    console.log("PARAMS: ", queryParams);
    connection.query(query, queryParams, (error, results, fields) => {
      if (error) {
        reject({ status: 401, msg: "Bad Query" })
      }

      resolve(results);
    })
  })
}

