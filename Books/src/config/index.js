const express = require('express'); 
const bodyParser = require('body-parser'); // convert incoming data into format that's readable
const api = require('../app');
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // parse incoming body data into JSON format
app.use('/api/v1', api);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));