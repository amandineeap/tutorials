"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('./config/config');
const express = require('express');
// const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const data = require('./routes/routes');
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors)
// app.options('*', cors())
// Express
app.get('/', function (req, res) {
    res.send({
        hostname: req.hostname,
        path: req.path,
        method: req.method,
    });
});
app.use('/data', data);
app.listen(config.PORT, function () {
    console.log('server running on port ' + config.PORT);
});
//# sourceMappingURL=index.js.map