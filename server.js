var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var cors = require('cors')

var MONGO_COLLECTION = "cervejarias";
var MONGODB_URI = 'mongodb://localhost:27017/cervejarias';
var PORT = 8081;

var app = express();
app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());
app.use(cors());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
    console.log(MONGODB_URI);
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

// CERVEJARIAS API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.get("/cervejarias/", function(req, res) {
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

app.post("/cervejarias/", function(req, res) {
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

app.get("/cervejarias/:id", function(req, res) {
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

app.put("/cervejarias/:id", function(req, res) {
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

app.delete("/cervejarias/:id", function(req, res) {
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
