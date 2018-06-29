import express from 'express';
import employeesRoutes from './employees';

const apiRouter = express.Router();

apiRouter.use(employeesRoutes);
apiRouter.route('/').get((req, res) => {
  console.log("I'm in the Root Route");

  res.sendStatus(200);
});

export default apiRouter;
