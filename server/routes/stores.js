import Store from '../models/store';
import StoreType from '../models/store-type';
import errorHandler from '../services/error-handler';

export const storesIndex = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Store.find({}, (err, stores) => {
    if (err) {
      return errorHandler(err, req, res, next);
    }

    return res.status(200).json(stores);
  });
}

export const storesShow = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Store.findOne({ _id: req.params.id }, (err, store) => {
    if (err) {
      return errorHandler(err, req, res, next);
    }

    return res.status(201).send(store);
  });
}

export const storesCreate = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  let store = new Store(req.body.data);
  store.save((err, store) => {
    if (err) {
      return errorHandler(err, req, res, next);
    }

    return res.status(202).send(store);
  });
}

export const storesUpdate = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  let id = req.params.id;
  let body = req.body.data;

  Store.findByIdAndUpdate(id, body, function(err, store) {
    if (err) {
      return errorHandler(err, req, res, next);
    }

    if (!store) {
      return errorHandler('Store with id ' + store._id + ' could not be found.', req, res, next, 404);
    }

    return res.status(203).json(store);
  });
}

export const storesDelete = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Store.findByIdAndRemove(req.params.id, function(err, store) {
    if (err) {
      return errorHandler(err, req, res, next);
    }

    // Render not found error
    if (!store) {
      return errorHandler('Store with id ' + store._id + ' can not be found.', req, res, next, 404);
    }

    return res.status(204).json(store);
  });
}
