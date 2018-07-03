
// const path = require('path');
// const fs = require('fs');
// require('dotenv').config();

// // console.log(process.env.GOOGLE_KEY);

// fs.writeFileSync('key.json', process.env.GOOGLE_KEY);
// process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.join(`${__dirname}/key.json`);

// const dialogflow = require('dialogflow');
// const sessionClient = new dialogflow.SessionsClient();


// const sessionPath = sessionClient.sessionPath(process.env.GOOGLE_PROJECT_ID, '123456');
  
//     // The text query request.
//     const request = {
//     session: sessionPath,
//         queryInput: {
//             text: {
//                 text: "bye",
//                 languageCode: 'en-US',
//             },
//         },
//     };

//     sessionClient
//         .detectIntent(request).then((response)=> {
//             console.log(response[0].queryResult.fulfillmentText);
//         })



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'anotherbot',
  password : 'Damyant@580',
  database : 'anotherbot'
});

connection.connect();
connection.query('SELECT * FROM `Name`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    console.log(results);
    
});
  
connection.end();