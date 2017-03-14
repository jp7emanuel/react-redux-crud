import StoreType from '../models/store-type';
import errorHandler from '../services/error-handler';

export const storeTypesIndex = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  StoreType.find((err, storeTypes) => {
    if (err) {
      return errorHandler(err, req, res, next);
    }

    return res.status(200).json(storeTypes);
  });
}

export const storeTypesCreate = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  let storeType = new StoreType(req.body.data);

  storeType.save((err, storeType) => {
    if (err) {
      return errorHandler(err, req, res, next);
    }

    return res.status(200).send(storeType);
  });
}
