import express from 'express';
import root from './routes';

const app = express();

app.use('/', root);

module.exports = app;
