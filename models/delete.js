'use strict';


const dynamodb = require('./dynamodb');
/**
 * delete movie
 */

module.exports.delete = (event, callback) => {
  const data = JSON.parse(event.body);
  data.ids.map((item) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: item
      },
    };
    /**
    * delete movie from database
    */
    dynamodb.delete(params, (error) => {
      if (error) {
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
      async(null, response);
    });

  })
};
