/*
 Author: Anderson Laverde
 date: 5 nov 2019 
 memcached Server in node js 
*/
//Importing the necessary packages and libraries for nodejs and configuration 
require('./config/config'); 
const express = require("express");
const Memcached = require('memcached');
const bodyParser = require('body-parser');
const app = express();
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










/* Handling memcached server errors*/
memcached.on('failure', function( details ){ sys.error( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
memcached.on('reconnecting', function( details ){ sys.debug( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});
/*handling some unexpected error and prevent the server crash*/ 
process.on('uncaughtException', function (error) {
    console.log(error.stack);
 });
/*Running express application*/
app.listen(process.env.PORT,()=>{
    console.log('Running in the port number : ',3000);
});