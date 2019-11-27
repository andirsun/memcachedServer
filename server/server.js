/*
 Author: Anderson Laverde
 date: 5 nov 2019 
 memcached Server in node js 
*/
//Importing the necessary packages and libraries for nodejs and configuration 
require('./config/config'); 
const express = require("express");//Node js library
const mongoose = require('mongoose');// To do querys in mongodb
const Memcached = require('memcached');// Memcached npm module
const bodyParser = require('body-parser');//to handle the body of request
const morgan = require('morgan');//show the historial of petitions in console
const path = require('path');//to show static path and get resources
const cors = require('cors');// security in request
const app = express();//Iinitialize app express node js server
/****************************************/
// Instance of memcached 
var memcached = new Memcached();
/*conection with memcached server*/ 
memcached.connect( 'localhost:11211', function( err, conection){
    /* first step: conection , before execute conection install memcached in the host with sudo apt-get install memcached*/
    if( err ) console.log( conection.server,'Error in conection to memcached server');
    else console.log("success conection");
});
/******************************* */
//Importing and using resources to run backend

app.use(express.static(publicPath));//access to data like images or anything else

app.use(morgan('dev'));
// Brings security in the api rest petitions
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/index')); // import all routes 









/* Handling memcached server errors*/
memcached.on('failure', function( details ){ sys.error( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
memcached.on('reconnecting', function( details ){ sys.debug( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});
/*handling some unexpected error and prevent the server crash*/ 
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
});
/*Running express application*/
app.listen(process.env.PORT,()=>{
    console.log('Running in the port number : ',process.env.PORT);
});