/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _bodyParser = __webpack_require__(4);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _mongodb = __webpack_require__(5);

	var _mongodb2 = _interopRequireDefault(_mongodb);

	var _cors = __webpack_require__(6);

	var _cors2 = _interopRequireDefault(_cors);

	var _ssr = __webpack_require__(7);

	var _ssr2 = _interopRequireDefault(_ssr);

	var _webpackDevMiddleware = __webpack_require__(32);

	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

	var _webpack = __webpack_require__(33);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpack3 = __webpack_require__(34);

	var _webpack4 = _interopRequireDefault(_webpack3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MONGO_COLLECTION = "cervejarias";
	var MONGODB_URI = 'mongodb://localhost:27017/cervejarias';
	var PORT = 8080;
	var ObjectID = _mongodb2.default.ObjectID;

	var app = (0, _express2.default)();
	app.use(_bodyParser2.default.json());
	app.use((0, _cors2.default)());

	// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
	var db;

	// CERVEJARIAS API ROUTES BELOW
	app.get("/api/cervejarias/", function (req, res) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

	    db.collection(MONGO_COLLECTION).find({}).toArray(function (err, docs) {
	        if (err) {
	            handleError(res, err.message, "Failed to get objects.");
	        } else {
	            res.status(200).json(docs);
	        }
	    });
	});

	app.post("/api/cervejarias/", function (req, res) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

	    db.collection(MONGO_COLLECTION).insertOne(req.body, function (err, doc) {
	        if (err) {
	            handleError(res, err.message, "Failed to create new object.");
	        } else {
	            res.status(201).json(doc.ops[0]);
	        }
	    });
	});

	app.get("/api/cervejarias/:id", function (req, res) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

	    db.collection(MONGO_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
	        if (err) {
	            handleError(res, err.message, "Failed to get object.");
	        } else {
	            res.status(200).json(doc);
	        }
	    });
	});

	app.put("/api/cervejarias/:id", function (req, res) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

	    var updateDoc = req.body;
	    delete updateDoc._id;

	    db.collection(MONGO_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
	        if (err) {
	            handleError(res, err.message, "Failed to update object.");
	        } else {
	            res.status(204).end();
	        }
	    });
	});

	app.delete("/api/cervejarias/:id", function (req, res) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

	    db.collection(MONGO_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
	        if (err) {
	            handleError(res, err.message, "Failed to delete object.");
	        } else {
	            res.status(204).end();
	        }
	    });
	});

	app.use(_express2.default.static('./dist'));
	app.use('/css', _express2.default.static('./dist/css'));
	app.use('/fonts', _express2.default.static('./dist/fonts'));

	app.use(function (req, res) {
	    (0, _ssr2.default)(req, res);
	});

	// Connect to the database before starting the application server.
	_mongodb2.default.MongoClient.connect(MONGODB_URI, function (err, database) {
	    if (err) {
	        console.log(err);
	        process.exit(1);
	    }

	    // Save database object from the callback for reuse.
	    db = database;
	    console.log("Database connection ready");

	    // Initialize the app.
	    var server = app.listen(PORT, function () {
	        var port = server.address().port;
	        console.log("App now running on port", port);
	    });
	});

	// Generic error handler used by all endpoints.
	function handleError(res, reason, message, code) {
	    console.log("ERROR: " + reason);
	    res.status(code || 500).json({ "error": message });
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = handleRender;

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(9);

	var _reducers = __webpack_require__(10);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _routes = __webpack_require__(18);

	var _routes2 = _interopRequireDefault(_routes);

	var _server = __webpack_require__(29);

	var _server2 = _interopRequireDefault(_server);

	var _axios = __webpack_require__(14);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactRouter = __webpack_require__(19);

	var _configStore = __webpack_require__(30);

	var _configStore2 = _interopRequireDefault(_configStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function handleRender(req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {

	      if (req.url === '/') {
	        // index route
	        return _axios2.default.get('http://localhost:8080/api/cervejarias').then(function (response) {
	          var initialState = {
	            cervejarias: {
	              all: response.data,
	              cervejaria: null,
	              isLoading: false,
	              error: false
	            }
	          };

	          return getRenderedPage(res, renderProps, initialState);
	        });
	      }

	      var splitUrl = req.url.split('/');
	      var id = splitUrl[splitUrl.length - 1];

	      if (id !== 'create') {
	        return _axios2.default.get('http://localhost:8080/api/cervejarias/' + id).then(function (response) {
	          var initialState = {
	            cervejarias: {
	              all: [],
	              cervejaria: response.data,
	              isLoading: false,
	              error: false
	            }
	          };

	          return getRenderedPage(res, renderProps, initialState);
	        });
	      }

	      return getRenderedPage(res, renderProps);
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
	}

	function getRenderedPage(res, renderProps) {
	  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var store = (0, _configStore2.default)(state);
	  var html = getHtml(store, renderProps);
	  var preloadedState = store.getState();
	  var pageRendered = renderFullPage(html, preloadedState);

	  return res.status(200).send(pageRendered);
	}

	function getHtml(store, renderProps) {
	  return _server2.default.renderToString(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	  ));
	}

	function renderFullPage(html, preloadedState) {
	  return '\n    <!DOCTYPE html>\n    <html>\n    <head>\n        <link rel="stylesheet" href="/css/app.css">\n    </head>\n    <body>\n        <div id="app">' + html + '</div>\n        <script>window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '</script>\n        <noscript>\n          <div class="container column">\n            <div class="message is-danger">\n              <div class="message-header">\n                <p><strong>Eita</strong>!</p>\n              </div>\n              <div class="message-body">\n                <p>Este site n\xE3o consegue executar todas as suas fun\xE7\xF5es se o JavaScript estiver desabilitado no seu navegador.</p>\n              </div>\n            </div>\n          </div>\n        </noscript>\n        <script src="/app.bundle.js"></script>\n    </body>\n    </html>\n    ';
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(11);

	var _reducer_cervejarias = __webpack_require__(12);

	var _reducer_cervejarias2 = _interopRequireDefault(_reducer_cervejarias);

	var _reduxForm = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  cervejarias: _reducer_cervejarias2.default,
	  form: _reduxForm.reducer
	});

	exports.default = rootReducer;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
	  var action = arguments[1];

	  switch (action.type) {
	    case _index.FETCH_HAS_ERRORED:
	      return (0, _reactAddonsUpdate2.default)(state, {
	        $merge: {
	          isLoading: false,
	          error: true
	        }
	      });
	    case _index.FETCH_CERVEJARIAS:
	      return (0, _reactAddonsUpdate2.default)(state, {
	        $merge: {
	          all: action.payload.data,
	          isLoading: false,
	          error: false
	        }
	      });
	    case _index.FETCH_CERVEJARIA:
	      return (0, _reactAddonsUpdate2.default)(state, {
	        $merge: {
	          cervejaria: action.payload.data,
	          isLoading: false,
	          error: false
	        }
	      });
	    case _index.DELETE_CERVEJARIA:
	      return (0, _reactAddonsUpdate2.default)(state.all, {
	        $set: {
	          all: Object.values((0, _lodash.omit)(state.all, function (item) {
	            return item._id === action.payload;
	          }))
	        }
	      });
	    default:
	      return state;
	  }
	};

	var _index = __webpack_require__(13);

	var _reactAddonsUpdate = __webpack_require__(15);

	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

	var _lodash = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var INITIAL_STATE = {
	  all: [],
	  cervejaria: null,
	  isLoading: true,
	  error: false
	}; // ES6

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPDATE_CERVEJARIA = exports.DELETE_CERVEJARIA = exports.CREATE_CERVEJARIA = exports.FETCH_CERVEJARIA = exports.FETCH_CERVEJARIAS = exports.FETCH_IS_LOADING = exports.FETCH_HAS_ERRORED = undefined;
	exports.requestCervejarias = requestCervejarias;
	exports.requestCervejaria = requestCervejaria;
	exports.fetchHasErrored = fetchHasErrored;
	exports.fetchIsLoading = fetchIsLoading;
	exports.fetchCervejarias = fetchCervejarias;
	exports.createCervejaria = createCervejaria;
	exports.fetchCervejaria = fetchCervejaria;
	exports.deleteCervejaria = deleteCervejaria;
	exports.updateCervejaria = updateCervejaria;

	var _axios = __webpack_require__(14);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_URL = 'http://localhost:8080/api';

	var FETCH_HAS_ERRORED = exports.FETCH_HAS_ERRORED = 'FETCH_HAS_ERRORED';
	var FETCH_IS_LOADING = exports.FETCH_IS_LOADING = 'FETCH_IS_LOADING';
	var FETCH_CERVEJARIAS = exports.FETCH_CERVEJARIAS = 'FETCH_CERVEJARIAS';
	var FETCH_CERVEJARIA = exports.FETCH_CERVEJARIA = 'FETCH_CERVEJARIA';
	var CREATE_CERVEJARIA = exports.CREATE_CERVEJARIA = 'CREATE_CERVEJARIA';
	var DELETE_CERVEJARIA = exports.DELETE_CERVEJARIA = 'DELETE_CERVEJARIA';
	var UPDATE_CERVEJARIA = exports.UPDATE_CERVEJARIA = 'UPDATE_CERVEJARIA';

	function requestCervejarias() {
	  return function (dispatch) {
	    dispatch(fetchIsLoading());

	    return _axios2.default.get(API_URL + '/cervejarias').then(function (response) {
	      dispatch(fetchCervejarias(response));
	    }).catch(function (response) {
	      dispatch(fetchHasErrored());
	      dispatch(pushState(null, '/error'));
	    });
	  };
	}

	function requestCervejaria(id) {
	  return function (dispatch) {
	    dispatch(fetchIsLoading());

	    return _axios2.default.get(API_URL + '/cervejarias/' + id).then(function (response) {
	      dispatch(fetchCervejaria(response));
	    }).catch(function (response) {
	      dispatch(fetchHasErrored());
	      dispatch(pushState(null, '/error'));
	    });
	  };
	}

	function fetchHasErrored() {
	  return {
	    type: FETCH_HAS_ERRORED
	  };
	}

	function fetchIsLoading() {
	  return {
	    type: FETCH_IS_LOADING
	  };
	}

	function fetchCervejarias(response) {
	  return {
	    type: FETCH_CERVEJARIAS,
	    payload: response
	  };
	}

	function createCervejaria(props) {
	  var request = _axios2.default.post(API_URL + '/cervejarias', props);
	  return {
	    type: CREATE_CERVEJARIA,
	    payload: request
	  };
	}

	function fetchCervejaria(response) {
	  return {
	    type: FETCH_CERVEJARIA,
	    payload: response
	  };
	}

	function deleteCervejaria(id) {
	  var request = _axios2.default.delete(API_URL + '/cervejarias/' + id);
	  return {
	    type: DELETE_CERVEJARIA,
	    payload: id
	  };
	}

	function updateCervejaria(props) {
	  var request = _axios2.default.put(API_URL + '/cervejarias/' + props._id, props);
	  return {
	    type: UPDATE_CERVEJARIA,
	    payload: request
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react-addons-update");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(19);

	var _app = __webpack_require__(20);

	var _app2 = _interopRequireDefault(_app);

	var _index = __webpack_require__(21);

	var _index2 = _interopRequireDefault(_index);

	var _create = __webpack_require__(23);

	var _create2 = _interopRequireDefault(_create);

	var _show = __webpack_require__(26);

	var _show2 = _interopRequireDefault(_show);

	var _edit = __webpack_require__(27);

	var _edit2 = _interopRequireDefault(_edit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: _app2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _index2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'cervejarias/create', component: _create2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'cervejarias/:id', component: _show2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'cervejarias/edit/:id', component: _edit2.default })
	  )
	);

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _index = __webpack_require__(21);

	var _index2 = _interopRequireDefault(_index);

	var _create = __webpack_require__(23);

	var _create2 = _interopRequireDefault(_create);

	var _reactRouter = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	    _inherits(App, _Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'section',
	                    { className: 'hero' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'hero-head' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'container' },
	                            _react2.default.createElement(
	                                'nav',
	                                { className: 'nav' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'nav-left' },
	                                    _react2.default.createElement(
	                                        _reactRouter.Link,
	                                        { to: '/', className: 'nav-item is-brand' },
	                                        _react2.default.createElement(
	                                            'h1',
	                                            { className: 'title' },
	                                            'React+Redux+Bulma'
	                                        )
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'nav-right nav-menu' },
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'nav-item' },
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: 'level-right' },
	                                            _react2.default.createElement(
	                                                _reactRouter.Link,
	                                                { to: '/cervejarias/create', className: 'button is-primary' },
	                                                'Adicionar Cervejaria'
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    )
	                ),
	                this.props.children
	            );
	        }
	    }]);

	    return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(9);

	var _index = __webpack_require__(13);

	var _index2 = __webpack_require__(22);

	var _index3 = _interopRequireDefault(_index2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CervejariasIndex = function (_Component) {
	  _inherits(CervejariasIndex, _Component);

	  function CervejariasIndex() {
	    _classCallCheck(this, CervejariasIndex);

	    return _possibleConstructorReturn(this, (CervejariasIndex.__proto__ || Object.getPrototypeOf(CervejariasIndex)).apply(this, arguments));
	  }

	  _createClass(CervejariasIndex, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.requestCervejarias();
	    }
	  }, {
	    key: 'onDelete',
	    value: function onDelete(id) {
	      event.preventDefault();
	      this.props.deleteCervejaria(id);
	    }
	  }, {
	    key: 'renderCervejarias',
	    value: function renderCervejarias() {
	      var _this2 = this;

	      return this.props.cervejarias.map(function (cervejaria, key) {
	        return _react2.default.createElement(
	          'tr',
	          { key: cervejaria._id },
	          _react2.default.createElement(
	            'td',
	            { width: '5%' },
	            key + 1
	          ),
	          _react2.default.createElement(
	            'td',
	            null,
	            _react2.default.createElement(
	              'a',
	              { href: '/cervejarias/' + cervejaria._id },
	              cervejaria.name
	            )
	          ),
	          _react2.default.createElement(
	            'td',
	            { className: 'is-icon', width: '5%' },
	            _react2.default.createElement(
	              'a',
	              { href: '/cervejarias/edit/' + cervejaria._id },
	              _react2.default.createElement('i', { className: 'fa fa-pencil-square-o' })
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: '#', onClick: _this2.onDelete.bind(_this2, cervejaria._id) },
	              _react2.default.createElement('i', { className: 'fa fa-remove' })
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.props.error) {
	        return _react2.default.createElement(_index3.default, null);
	      }

	      if (this.props.isLoading) {
	        return _react2.default.createElement(_index3.default, null);
	      }

	      if (!this.props.cervejarias.length) {
	        return _react2.default.createElement(_index3.default, { message: 'Nenhuma cervejaria cadastrada!' });
	      }

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'container column' },
	          _react2.default.createElement(
	            'h3',
	            { className: 'title is-1' },
	            'Lista de Cervejarias'
	          ),
	          _react2.default.createElement('hr', null),
	          _react2.default.createElement(
	            'table',
	            { className: 'table' },
	            _react2.default.createElement(
	              'thead',
	              null,
	              _react2.default.createElement(
	                'tr',
	                null,
	                _react2.default.createElement(
	                  'th',
	                  null,
	                  _react2.default.createElement(
	                    'strong',
	                    null,
	                    '#'
	                  )
	                ),
	                _react2.default.createElement(
	                  'th',
	                  null,
	                  _react2.default.createElement(
	                    'strong',
	                    null,
	                    'Name'
	                  )
	                ),
	                _react2.default.createElement(
	                  'th',
	                  null,
	                  _react2.default.createElement(
	                    'strong',
	                    null,
	                    'Links'
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'tbody',
	              null,
	              this.renderCervejarias()
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return CervejariasIndex;
	}(_react.Component);

	function mapStateToProps(state) {
	  return {
	    cervejarias: state.cervejarias.all,
	    error: state.cervejarias.error,
	    isLoading: state.cervejarias.isLoading
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { requestCervejarias: _index.requestCervejarias, deleteCervejaria: _index.deleteCervejaria })(CervejariasIndex);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ErrorMessage = function (_Component) {
	  _inherits(ErrorMessage, _Component);

	  function ErrorMessage() {
	    _classCallCheck(this, ErrorMessage);

	    return _possibleConstructorReturn(this, (ErrorMessage.__proto__ || Object.getPrototypeOf(ErrorMessage)).apply(this, arguments));
	  }

	  _createClass(ErrorMessage, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        { className: 'container column' },
	        this.props.message ? this.props.message : 'Houve um problema ao retornar a lista de dados!'
	      );
	    }
	  }]);

	  return ErrorMessage;
	}(_react.Component);

	exports.default = ErrorMessage;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(9);

	var _reduxForm = __webpack_require__(17);

	var _index = __webpack_require__(13);

	var _form = __webpack_require__(25);

	var _form2 = _interopRequireDefault(_form);

	var _reactRouter = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CervejariasCreate = function (_Component) {
	  _inherits(CervejariasCreate, _Component);

	  function CervejariasCreate() {
	    _classCallCheck(this, CervejariasCreate);

	    return _possibleConstructorReturn(this, (CervejariasCreate.__proto__ || Object.getPrototypeOf(CervejariasCreate)).apply(this, arguments));
	  }

	  _createClass(CervejariasCreate, [{
	    key: 'onSubmit',
	    value: function onSubmit(props) {
	      this.props.createCervejaria(props);
	      this.props.router.push('/');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_form2.default, {
	        formSubmit: this.onSubmit.bind(this),
	        actionName: 'Adicionar',
	        method: 'post'
	      });
	    }
	  }]);

	  return CervejariasCreate;
	}(_react.Component);

	var form = (0, _reduxForm.reduxForm)({
	  form: 'CervejariasCreateForm',
	  validate: _form.validate
	});

	exports.default = (0, _reactRedux.connect)(null, { createCervejaria: _index.createCervejaria })(form((0, _reactRouter.withRouter)(CervejariasCreate)));

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.validate = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(9);

	var _reduxForm = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var validate = exports.validate = function validate(values) {
	  var errors = {};
	  var rules = {
	    required: 'Campo obrigatório'
	  };

	  if (!values.name || values.name.trim() === '') {
	    errors.name = rules.required;
	  }

	  return errors;
	};

	var renderField = function renderField(_ref) {
	  var input = _ref.input,
	      label = _ref.label,
	      type = _ref.type,
	      _ref$meta = _ref.meta,
	      touched = _ref$meta.touched,
	      error = _ref$meta.error,
	      warning = _ref$meta.warning;
	  return _react2.default.createElement(
	    'div',
	    { className: 'control' },
	    _react2.default.createElement(
	      'label',
	      { className: 'label' },
	      label,
	      ':'
	    ),
	    _react2.default.createElement(
	      'p',
	      null,
	      _react2.default.createElement('input', _extends({}, input, {
	        type: type,
	        className: 'input ' + (touched && error ? 'is-danger' : ''),
	        autoFocus: input.name === 'name' ? true : false
	      })),
	      touched && error && _react2.default.createElement(
	        'span',
	        { className: 'help is-danger' },
	        error
	      )
	    )
	  );
	};

	var CervejariasForm = function (_Component) {
	  _inherits(CervejariasForm, _Component);

	  function CervejariasForm() {
	    _classCallCheck(this, CervejariasForm);

	    return _possibleConstructorReturn(this, (CervejariasForm.__proto__ || Object.getPrototypeOf(CervejariasForm)).apply(this, arguments));
	  }

	  _createClass(CervejariasForm, [{
	    key: 'onSubmit',
	    value: function onSubmit(props) {
	      this.props.formSubmit(props);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          handleSubmit = _props.handleSubmit,
	          submitting = _props.submitting,
	          pristine = _props.pristine,
	          reset = _props.reset,
	          initialValues = _props.initialValues,
	          error = _props.error,
	          isLoading = _props.isLoading;


	      return _react2.default.createElement(
	        'form',
	        { onSubmit: handleSubmit(function (props) {
	            return _this2.onSubmit(props);
	          }), method: 'post' },
	        this.props.method !== "post" ? _react2.default.createElement('input', { type: 'hidden', name: '_method', value: 'put' }) : null,
	        _react2.default.createElement(
	          'div',
	          { className: 'container column' },
	          _react2.default.createElement(
	            'h3',
	            { className: 'title is-1' },
	            this.props.actionName,
	            ' Cervejaria'
	          ),
	          _react2.default.createElement('hr', null),
	          _react2.default.createElement(_reduxForm.Field, { name: 'name', label: 'Name', component: renderField, type: 'text' }),
	          _react2.default.createElement(
	            'p',
	            { className: 'control' },
	            _react2.default.createElement(
	              'button',
	              { type: 'submit', className: 'button is-primary', disabled: submitting },
	              'Enviar'
	            ),
	            _react2.default.createElement(
	              'button',
	              { type: 'button', className: 'button is-link', disabled: pristine || submitting, onClick: reset },
	              'Reiniciar'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return CervejariasForm;
	}(_react.Component);

	var form = (0, _reduxForm.reduxForm)({
	  form: 'CervejariasStoreForm',
	  validate: validate
	});

	// export default connect(mapStateToProps)(form(CervejariasForm));
	exports.default = (0, _reactRedux.connect)()(form(CervejariasForm));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(9);

	var _index = __webpack_require__(13);

	var _index2 = __webpack_require__(22);

	var _index3 = _interopRequireDefault(_index2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CervejariasShow = function (_Component) {
	  _inherits(CervejariasShow, _Component);

	  function CervejariasShow() {
	    _classCallCheck(this, CervejariasShow);

	    return _possibleConstructorReturn(this, (CervejariasShow.__proto__ || Object.getPrototypeOf(CervejariasShow)).apply(this, arguments));
	  }

	  _createClass(CervejariasShow, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.requestCervejaria(this.props.params.id);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          cervejaria = _props.cervejaria,
	          error = _props.error,
	          isLoading = _props.isLoading;


	      if (error) {
	        return _react2.default.createElement(_index3.default, null);
	      }

	      if (isLoading) {
	        return _react2.default.createElement(_index3.default, null);
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: 'container column' },
	        'Cervejaria: ',
	        cervejaria.name
	      );
	    }
	  }]);

	  return CervejariasShow;
	}(_react.Component);

	function mapStateToProps(state) {
	  return {
	    cervejaria: state.cervejarias.cervejaria,
	    isLoading: state.cervejarias.isLoading,
	    error: state.cervejarias.error
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { requestCervejaria: _index.requestCervejaria })(CervejariasShow);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(9);

	var _reduxForm = __webpack_require__(17);

	var _index = __webpack_require__(13);

	var _form = __webpack_require__(25);

	var _form2 = _interopRequireDefault(_form);

	var _index2 = __webpack_require__(28);

	var _index3 = _interopRequireDefault(_index2);

	var _index4 = __webpack_require__(22);

	var _index5 = _interopRequireDefault(_index4);

	var _reactRouter = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CervejariasEdit = function (_Component) {
	  _inherits(CervejariasEdit, _Component);

	  function CervejariasEdit() {
	    _classCallCheck(this, CervejariasEdit);

	    return _possibleConstructorReturn(this, (CervejariasEdit.__proto__ || Object.getPrototypeOf(CervejariasEdit)).apply(this, arguments));
	  }

	  _createClass(CervejariasEdit, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.requestCervejaria(this.props.params.id);
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(props) {
	      this.props.updateCervejaria(props);
	      this.props.router.push('/');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          handleSubmit = _props.handleSubmit,
	          submitting = _props.submitting,
	          pristine = _props.pristine,
	          reset = _props.reset,
	          error = _props.error,
	          isLoading = _props.isLoading,
	          cervejaria = _props.cervejaria;


	      if (error) {
	        return _react2.default.createElement(_index5.default, null);
	      }

	      if (isLoading) {
	        return _react2.default.createElement(_index3.default, null);
	      }

	      return _react2.default.createElement(_form2.default, {
	        formSubmit: this.onSubmit.bind(this),
	        initialValues: cervejaria,
	        actionName: 'Adicionar',
	        method: 'put'
	      });
	    }
	  }]);

	  return CervejariasEdit;
	}(_react.Component);

	var form = (0, _reduxForm.reduxForm)({
	  form: 'CervejariasEditForm',
	  validate: _form.validate
	});

	function mapStateToProps(state) {
	  return {
	    cervejaria: state.cervejarias.cervejaria,
	    isLoading: state.isLoading,
	    error: state.error
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { requestCervejaria: _index.requestCervejaria, updateCervejaria: _index.updateCervejaria })(form((0, _reactRouter.withRouter)(CervejariasEdit)));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loading = function (_Component) {
	  _inherits(Loading, _Component);

	  function Loading() {
	    _classCallCheck(this, Loading);

	    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	  }

	  _createClass(Loading, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "p",
	        { className: "container column" },
	        "Loading..."
	      );
	    }
	  }]);

	  return Loading;
	}(_react.Component);

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(11);

	var _reducers = __webpack_require__(10);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _reduxThunk = __webpack_require__(31);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  // Create the store with middlewares
	  var middlewares = [_reduxThunk2.default];

	  var enhancers = [_redux.applyMiddleware.apply(undefined, middlewares)];

	  var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));

	  // Extensions
	  store.asyncReducers = {}; // Async reducer registry

	  return store;
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(3);
	var webpack = __webpack_require__(33);
	var nodeExternals = __webpack_require__(35);

	module.exports = [{
	  entry: ['./server.js'],
	  output: {
	    path: './',
	    filename: 'server.bundle.js'
	  },
	  module: {
	    loaders: [{
	      exclude: /node_modules/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['react', 'es2015']
	      }
	    }]
	  },
	  target: 'node',
	  externals: [nodeExternals()]
	}, {
	  entry: './src/index.js',
	  output: {
	    path: './dist',
	    filename: 'app.bundle.js'
	  },
	  module: {
	    loaders: [{
	      exclude: /node_modules/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['react', 'es2015']
	      }
	    }]
	  }
	  //If you want to minify your files uncomment this
	  // ,
	  // plugins: [
	  //     new webpack.optimize.UglifyJsPlugin({
	  //         compress: {
	  //             warnings: false,
	  //         },
	  //         output: {
	  //             comments: false,
	  //         },
	  //     }),
	  // ]
	}];

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("webpack-node-externals");

/***/ }
/******/ ]);