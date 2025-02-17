require('dotenv').config();
const http = require('http');
const socketConfig = require('./sockets/config');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profilesRouter = require('./routes/profiles');
var channelsRouter = require('./routes/channels');
var messagesRouter = require('./routes/messages');
var placesRouter = require('./routes/places');

var projectsRouter = require('./routes/projects');

var app = express();
const cors = require('cors');
const corsOptions = {
    origin: function (origin, callback) {
      // Remplacee 'allowedOrigins' avec vos différents URLs front pouvant accéder au Backend
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://192.168.0.35:3000",
        "http://192.168.0.35:3001",
        "http://192.168.100.22:3000",
        "http://192.168.1.6:3000",
        "http://192.168.100.110:3000",
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  };
  
  app.use(cors(corsOptions))

  const server = http.createServer(app);
// Configurer les sockets
socketConfig(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/channels', channelsRouter);
app.use('/messages', messagesRouter);
app.use('/places', placesRouter);
app.use('/projects', projectsRouter);

server.listen(4000, () => {
  console.log('Listening on port 4000 ITS RUNNING');
});

module.exports = app;
