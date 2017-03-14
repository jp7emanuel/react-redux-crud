import http from 'http';
import express from 'express';
import path from 'path';
import db from './services/db';
import {
  storesIndex,
  storesShow,
  storesCreate,
  storesUpdate,
  storesDelete
} from './routes/stores';
import {
  storeTypesIndex,
  storeTypesCreate
} from './routes/store-types';
import bodyParser from 'body-parser';
import ssr from './ssr';
import cors from 'cors';

let app = express();
let router = express.Router();
router.all('*', cors());

app.server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

router.route('/api/stores').get(storesIndex);
router.route('/api/stores').post(storesCreate);
router.route('/api/stores/:id').get(storesShow);
router.route('/api/stores/:id').put(storesUpdate);
router.route('/api/stores/:id').delete(storesDelete);

router.route('/api/store-types').get(storeTypesIndex);
router.route('/api/store-types').post(storeTypesCreate);


router.route('*').get((req, res) => {
  ssr(req, res);
});

app.use(router);

app.server.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port %d!', app.server.address().port);
});

export default app;
