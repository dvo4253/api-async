import express from 'express';
import employeesRoutes from './employees';
import departmentRoutes from './departments';

const apiRouter = express.Router();

apiRouter.use(employeesRoutes);
apiRouter.use(departmentRoutes);
apiRouter.route('/').get((req, res) => {
  console.log("I'm in the Root Route");

  res.sendStatus(200);
});

export default apiRouter;
