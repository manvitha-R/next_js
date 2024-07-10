let express = require('express');
const http = require('http');
const socketIo = require('socket.io');
// const io = socketIo(server);
// const server = http.createServer(app);
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./db/database');


// Initialize express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = socketIo(server);


// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    // useNewUrlParser: true,
}).then(() => {
    console.log('Database connected');
}).catch(error => {
    console.log('Database could not be connected: ' + error);
});

// const app = express();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
const menuRoute = require('./routes/menu.routes');





// app.use('/endpoint', userRoute, rolesRoute);
app.use('/endpoint', [ menuRoute]);

// Start server
const port = process.env.PORT || 1805;

 server.listen(port, () => {
    console.log('Port connected to: ' + port);
});

// Error handling
app.use((req, res, next) => {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.use(function (err, req, res, next) {
    console.error(err);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ error: err.message });
});

