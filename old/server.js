import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongodb from "mongodb";
import cors from 'cors';
import handleRender from './ssr';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import config from './webpack.config';

var MONGO_COLLECTION = "cervejarias";
var MONGODB_URI = 'mongodb://localhost:27017/cervejarias';
var PORT = 8080;
var ObjectID = mongodb.ObjectID;

var app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// CERVEJARIAS API ROUTES BELOW
app.get("/api/cervejarias/", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    db.collection(MONGO_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get objects.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/api/cervejarias/", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    db.collection(MONGO_COLLECTION).insertOne(req.body, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new object.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });

});

app.get("/api/cervejarias/:id", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    db.collection(MONGO_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get object.");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/cervejarias/:id", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(MONGO_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update object.");
        } else {
            res.status(204).end();
        }
    });

});

app.delete("/api/cervejarias/:id", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  db.collection(MONGO_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete object.");
    } else {
      res.status(204).end();
    }
  });
});

app.use(express.static('./dist'));
app.use('/css', express.static('./dist/css'));
app.use('/fonts', express.static('./dist/fonts'));

app.use((req, res) => {
  handleRender(req, res);
});


// Connect to the database before starting the application server.
mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
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
    res.status(code || 500).json({"error": message});
}


