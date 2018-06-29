import express from 'express';

const apiRouter = express.Router();

apiRouter.route('/').get((req, res) => {
  console.log("I'm in the Root Route");
 
  res.sendStatus(200);
});

export default apiRouter;
