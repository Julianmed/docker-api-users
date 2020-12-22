const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./database');
const userRoute = require('./routes/user.route');
mongoose.Promise = global.Promise;

mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(
() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database '+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/user', userRoute);

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "User mobile API",
            description: "Api for management of users",
            contact: {
                name: "julianmed"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 8081;

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});