'use strict';

const AWS = require('aws-sdk');
const dynamodb = require('./dynamodb');

/**
 * get movie
 * @param {string} ID
 */
module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  /**
   * fetch item from the database
   * @return {moviesObject}
   */
  dynamodb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    /**
     *  convert to JSON and create a response
     */
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
