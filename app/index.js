import 'dotenv/config';
import express from 'express';
import routerBack from './back/router.js';

const app = express();
const port = process.env.PORT

app.use('/api', routerBack);

app.listen(port, () => {
    console.log('http://localhost:' + port);
});