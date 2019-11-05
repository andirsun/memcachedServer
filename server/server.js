/*
 Author: Anderson Laverde
 date: 5 nov 2019 
 memcached Server in node js 
*/
//Importing the necessary packages and libraries for node js 
const express = require("express");
const memcached = require('memcached');
const app = express();





/*handling some unexpected error and prevent the server crash*/ 
process.on('uncaughtException', function (error) {
    console.log(error.stack);
    
 });
/*Running express application*/
app.listen(process.env.PORT,()=>{
    console.log('Running in the port number : ',3000);
});