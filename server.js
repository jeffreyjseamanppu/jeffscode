const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

/*
var schedule = require('node-schedule');

var j = schedule.scheduleJob('30 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
*/

/*
  This scheduler is like a cron job that runs based on a date and time
*/
var schedule = require('node-schedule');
var year = 2022;
var month = 03; //0=Jan,1=Feb,2=Mar,3=Apr,4=May etc;
var day = 29; //day
var hour = 17;
var minute = 36;

var date = new Date(year, month, day, hour, minute, 0);

var j = schedule.scheduleJob(date, function(){
  console.log('Sent Notification');
  sendNotification(message);
});

//Function to send the notifications
var sendNotification = function(data) {

  var appid = "";
  var token = "";
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic " + token

  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

//Message that is sent to the users
var myappid = "";
var message = {
  app_id: myappid,
  contents: {"en": "This is a test"},
  headings: {"en": "Meet the Point Park Staff"},
  included_segments: ["All"]
};



//Server listening
app.listen(6002,() =>{
  console.log('Server started...');
});
