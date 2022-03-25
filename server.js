const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://u3gl3ikwlhzotfwr0wld:6h0vSkGbJSo0pTtYmKJE@bdgrm2udrarhz85-mongodb.services.clever-cloud.com:27017/bdgrm2udrarhz85";
const DATABASE_NAME = "bdgrm2udrarhz85";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var database, recipe_collection;

app.get('/api/recipes', (req, res) => {
    recipe_collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
})

app.get('/api/recipes/:recipe_id', (req, res) => {
    var recipe_id = req.params.recipe_id;
    recipe_collection.find({"recipe_id": recipe_id}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});



app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        recipe_collection = database.collection("recipes");
        console.log("Connected to `" + DATABASE_NAME + "`!");
        console.log('Listening on localhost:5000');
      });
  });