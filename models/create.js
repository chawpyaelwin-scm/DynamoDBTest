'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');
/**
 * create movies
 * return {moviesObject}
 */
module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  /**
   * validation
   */

  if (typeof data.title !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      body: 'Couldn\'t create the todo item.....**',
    });
    return;
  }
  /**
   * Insert Record
   */
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      title: data.title,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
      author: data.author,
      year: data.year
    },
  };

  /**
   *  add the movies to the database
   */
  dynamodb.put(params, (error) => {
    console.log("BeforeInsert", params);

    if (error) {
      console.log("SPARAMS", params);

      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'author/plain' },
        body: 'Couldn\'t create the todo item.....',
      });
      return;
    }

    /**
     * convert to JSON and create a response
     */
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
