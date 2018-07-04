
// // const path = require('path');
// // const fs = require('fs');
// // require('dotenv').config();

// // // console.log(process.env.GOOGLE_KEY);

// // fs.writeFileSync('key.json', process.env.GOOGLE_KEY);
// // process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.join(`${__dirname}/key.json`);

// // const dialogflow = require('dialogflow');
// // const sessionClient = new dialogflow.SessionsClient();


// // const sessionPath = sessionClient.sessionPath(process.env.GOOGLE_PROJECT_ID, '123456');
  
// //     // The text query request.
// //     const request = {
// //     session: sessionPath,
// //         queryInput: {
// //             text: {
// //                 text: "bye",
// //                 languageCode: 'en-US',
// //             },
// //         },
// //     };

// //     sessionClient
// //         .detectIntent(request).then((response)=> {
// //             console.log(response[0].queryResult.fulfillmentText);
// //         })
// //   

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'anotherbot',
  password : 'Damyant@580',
  database : 'anotherbot'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
      ['John', 'Highway 71'],
      ['Peter', 'Lowstreet 4'],
      ['Amy', 'Apple st 652'],
      ['Hannah', 'Mountain 21'],
      ['Michael', 'Valley 345'],
      ['Sandy', 'Ocean blvd 2'],
      ['Betty', 'Green Grass 1'],
      ['Richard', 'Sky st 331'],
      ['Susan', 'One way 98'],
      ['Vicky', 'Yellow Garden 2'],
      ['Ben', 'Park Lane 38'],
      ['William', 'Central st 954'],
      ['Chuck', 'Main Road 989'],
      ['Viola', 'Sideway 1633']
    ];
    connection.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
  


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://damyant:damyant580@ds125331.mlab.com:25331/anotherbot";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("anotherbot");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });