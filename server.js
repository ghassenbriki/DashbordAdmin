//Install express server
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/dashboard'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/dashboard/index.html'));
});

const PORT = 3500;

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 3500);

/* ===============================
 # SSL configuration
   ===============================*/

const sslOptions = {

  key: fs.readFileSync('ssl-certif/private.key'),
  cert: fs.readFileSync('ssl-certif/certificate.crt'),

  ca: [
    fs.readFileSync('ssl-certif/ca_bundle.crt')
  ]
};


const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(+PORT);
