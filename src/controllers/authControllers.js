const User = require('../models/user');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlacklist');

//localhost:8765/evcharge/api/login
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // check if email exists
  User.findOne({
    where: {
      email: email,
    },
  })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this e-mail could not be found.');
        error.statusCode = 401;
        throw error;
      }
      //Here the user exists. We validate the password now.
      loadedUser = user;
      if (user.password != password) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      // the authentication is correct we now have to generate a jwt
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.idUser,
          rank: loadedUser.rank,
        },
        'secretkeythatonlytheserverhas',
        { expiresIn: '1h' } //the token can be copied from the browser data and be used forever. So, we make it  to expireevery one hour.
      );
      res.status(200).json({ token: token });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 400;
        res.status(err.statusCode).send('Bad request.');
      }
      console.log(err.message);
      res.status(err.statusCode).send(err.message);
    });
};

//localhost:8765/evcharge/api/logout
exports.postLogout = (req, res, next) => {
  const token = req.get('XOBSERVATORY-AUTH');
  if (!token) {
    const error = new Error(
      'Not authenticated. You have to login to be able to logout!'
    );
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }
  TokenBlacklist.create({
    token: token,
  })
    .then(result => {
      console.log('Token Added to Blacklist');
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
    });
};
