//================================
// Port Configuration
//=================================
process.env.PORT = process.env.PORT || 3000; //if the enviroment variable is not set, then set by default 3000
// ============================
//  Enviroment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'prod';


// ============================
//  Database 
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    //Local database to test in dev enviroment
    urlDB = 'mongodb://localhost:27017/memcachedDB';
} else {
    //mongoBD atlass to setup mongodb in the cloud
    urlDB = "mongodb+srv://admin:y8Rf@bnjiYKEk8_@timugo-d2l1g.mongodb.net/timugoBackend";
}

//urlDB = "mongodb+srv://admin:y8Rf@bnjiYKEk8_@timugo-d2l1g.mongodb.net/timugoBackend";
 