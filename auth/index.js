const express = require('express');
const app = express();
const request = require("request");

const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

const users = [
  {
    id: 'H17TTGfDg',
    name: 'admin',
    password: 'admin',
    avatar: 'H17TTGfDg.jpg'
  },
  {
    id: 'ByxQaTzGPg',
    name: 'test',
    password: 'test',
    avatar: 'ByxQaTzGPg.jpg'
  },
  {
    id: 'rJ-maTffwl',
    name: 'minh',
    password: 'minh',
    avatar: 'rJ-maTffwl.jpg'
  }
];

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  const user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/avatar', express.static('avatar'));

app.get('/', (req, res) => {
  res.send('<h1>This is Authentication micro-service</h1>');
});

app.get("/getuser/:id", (req, res) => {
  const user = users[_.findIndex(users, {id: req.params.id})];
  if (!user) {
    res.status(401).json({message: "No such user found"});
  } else {
    res.json({name: user.name, avatar: user.avatar});  //should only return safe info: user name and avatar not password
  }
});

app.post("/login", (req, res) => {
  let name;
  let password;
  if (req.body.name && req.body.password) {
    name = req.body.name;
    password = req.body.password;
  }
  // usually this would be a database call:
  const user = users[_.findIndex(users, {name: name})];
  if (!user) {
    res.status(401).json({message: "no such user found"});
    return;
  }


  if (user.password === password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = {id: user.id};
    const token = jwt.sign(payload, jwtOptions.secretOrKey);  //Ký vào payload sử dụng secretOrKey

    res.json({token: token, avatar: user.avatar, group: "customer", app: "webapp"});  //và trả về
  } else {
    res.status(401).json({message: "passwords did not match"});
  }
});

app.listen(3001, () => {
  console.log('Authenticate service at port 3001');
});
