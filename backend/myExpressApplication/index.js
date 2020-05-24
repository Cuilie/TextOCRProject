// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');


const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

// Get User endpoint
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get menu' });
    }
    if (result.Item) {
      const {menuId, menuPath} = result.Item;
      res.json({ menuId, menuPath });
    } else {
      res.status(404).json({ error: "Menu not found" });
    }
  });
})

// Create User endpoint
app.post('/users', function (req, res) {
  const { menuId, menuPath } = req.body;
  if (typeof menuId !== 'string') {
    res.status(400).json({ error: '"menuId" must be a string' });
  } else if (typeof menuPath !== 'string') {
    res.status(400).json({ error: '"menuPath" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: menuId,
      menuPath: menuPath,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create menu' });
  }
    res.json({ menuId, menuPath });
  });
})



const MENUS_TABLE = process.env.MENUS_TABLE;



// Get User endpoint
app.get('/table/:menuId', function (req, res) {
  const params = {
    TableName: MENUS_TABLE,
    Key: {
      menuId: req.params.menuId,
    },
  }
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get menu' });
    }
    if (result.Item) {
      const {menuId, jsonStr} = result.Item;
      res.json({ jsonStr });
    } else {
      res.status(404).json({ error: "Menu not found" });
    }
  });
})

// Create User endpoint
app.post('/table', function (req, res) {
  const { menuId, jsonStr } = req.body;
  if (typeof menuId !== 'string') {
    res.status(400).json({ error: '"menuId" must be a string' });
  }


  const params = {
    TableName: MENUS_TABLE,
    Item: {
      menuId: menuId,
      jsonStr: jsonStr,
    },
  };
  // res.json({menuId, jsonStr});
  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Menu not found" });
    }
    res.json({ menuId, jsonStr });
  });
})



module.exports.handler = serverless(app);
