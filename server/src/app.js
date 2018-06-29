import express from 'express';
import path from 'path';
import root from './routes';

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), '/dist/public'));

app.use(`dist/public`, express.static('/dist/public', { maxAge: '365d' })); // todo: move assets folder to asset public and add base path
app.use('/', root);

module.exports = app;
