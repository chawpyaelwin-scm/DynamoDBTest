// 'use strict';


// const dynamodb = require('./dynamodb');
// /**
//  * delete movie
//  */

// module.exports.delete = (event, callback) => {

//     const data = JSON.parse(event.body);
//     console.log("MULTIDATAS", data);

//     const params = {
//         TableName: process.env.DYNAMODB_TABLE,
//         Key: {
//             // id: event.pathParameters.id,
//             id: data.ids
//         },
//     };
//     console.log("PARAMSDELETE", params);
//     /**
//       * delete movie from database
//       */
//     dynamodb.delete(params, (error) => {
//         /**
//         * validation
//         */
//         console.log("CALLBACK", params);

//         if (error) {
//             callback(null, {
//                 statusCode: error.statusCode || 501,
//                 body: 'Couldn\'t remove the todo item.',
//             });
//             return;
//         }

//         /**
//          * convert to JSON and create a response
//          */
//         const response = {
//             statusCode: 200,
//             body: JSON.stringify({}),
//         };
//         console.log("RESPONSEDATA", response);

//         callback(null, response);
//     });
// };
