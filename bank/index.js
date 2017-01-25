/**
 * Created by techmaster on 1/24/17.
 */
const express = require('express');
const app = express();
const request = require("request");

const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';


const cors = require('cors');
app.use(cors());

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  // Đoạn này sẽ phải gọi sang auth app
  let id = jwt_payload.id;

  request.get({url: `http://localhost:3001/getuser/${id}`, json: true},
    (err, response, body) => {
      next(null, body);
    }
  );
});



passport.use(strategy);
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));




app.get("/bank", passport.authenticate('jwt', {session: false}), (req, res) => {
  const bankaccounts = [
    {name: "Bill Gates", balance: 1000},
    {name: "Elon Musk", balance: 1200},
    {name: "Steve Jobs", balance: 800},
    {name: "Donald Trump", balance: 999}
    ];
  res.json(bankaccounts);
});


app.listen(3002, () => {
  console.log('Bank service at port 3002');
});
