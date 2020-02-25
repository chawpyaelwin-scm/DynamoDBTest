'use strict';

const AWS = require('aws-sdk');

/**
 * connect the dynamoDB using region
 */
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "localhost"
});

/**
 * get all movies
 */
module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  /**
   * fetch all todos from the database
   * @return {moviesList}
   */

  dynamoDb.scan(params, (error, result) => {
    console.log("resultGET", params);

    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        body: 'Couldn\'t fetch the movies.',
      });
      return;
    }

    /**
     * convert to json and create a response 
     */
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
