import http from 'http';
import app from './app';

const httpServer = http.createServer(app).listen(8000, () => {
  console.info(`app is listening at localhost: ${8000}`);
});

process.on('SIGTERM', () => {
  httpServer.close(() => {
    console.info('SIGTERM issued...app is shutting down');
    process.exit(0);
  });
});
