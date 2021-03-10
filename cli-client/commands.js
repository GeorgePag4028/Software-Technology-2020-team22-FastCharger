const axios = require('axios');
const qs = require('qs');
const fs = require('fs');
const path = require('path');
var FormData = require('form-data');
const { program } = require('commander');
const homedir = require('os').homedir();
const tokenPath = path.join(homedir, 'softeng20bAPI.token');

const readToken = () => {
  try {
    const ouf = fs.readFileSync(tokenPath, 'utf8');
    return ouf;
  } catch (err) {
    console.log('There is no token in your home dir. You have to sign in.');
    // console.error(err);
  }
};

exports.getHealthcheck = () => {
  axios({
    method: 'get',
    url: 'http://localhost:8765/evcharge/api/admin/healthcheck',
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
};

exports.getResetSessions = () => {
  axios({
    method: 'get',
    url: 'http://localhost:8765/evcharge/api/admin/resetSessions',
  })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// exports.postLogin = (username, password) => {
//   const data = qs.stringify({
//     username: username,
//     password: password, //Uncomments this and replace the first 4 lines
//   });                   //so you do not have prompts
exports.postLogin = answers => {
  const data = qs.stringify({
    username: answers.username,
    password: answers.password,
  });

  if (answers.username) {
    axios({
      method: 'post',
      url: 'http://localhost:8765/evcharge/api/login',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let dataa = JSON.stringify(response.data);
        let token = dataa.split(':"')[1];
        token = token.substring(0, token.length - 2);
        fs.writeFile(
          // path.join(homedir, 'softeng20bAPI.token'), // save file to {HOME}\softeng20bAPI.token sto PC MOU: C:\Users\SeCre\softeng20bAPI.token
          tokenPath,
          token,
          function (err) {
            if (err) {
              return console.log(err);
            }
            // console.log('The file was saved!');
          }
        );
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  } else console.log('You did not put a username.Try again.');
};

//logout
exports.postLogout = () => {
  const token = readToken();
  if (token) {
    axios({
      method: 'post',
      url: 'http://localhost:8765/evcharge/api/logout',
      headers: {
        'XOBSERVATORY-AUTH': token,
      },
    })
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response.data);
        try {
          fs.unlinkSync(tokenPath);
          //file removed
        } catch (err) {
          console.error(err);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

exports.postSessionsPerPoint = (point, datefrom, dateto, format) => {
  const token = readToken();
  if (token) {
    axios({
      method: 'get',
      url:
        'http://localhost:8765/evcharge/api/SessionsPerPoint/' +
        point +
        '/' +
        datefrom +
        '/' +
        dateto +
        '?format=' +
        format,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'XOBSERVATORY-AUTH': token,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

exports.postSessionsPerStation = (Station, datefrom, dateto, format) => {
  const token = readToken();
  if (token) {
    axios({
      method: 'get',
      url:
        'http://localhost:8765/evcharge/api/SessionsPerStation/' +
        Station +
        '/' +
        datefrom +
        '/' +
        dateto +
        '?format=' +
        format,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'XOBSERVATORY-AUTH': token,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

exports.postSessionsPerEv = (ev, datefrom, dateto, format) => {
  const token = readToken();
  if (token) {
    axios({
      method: 'get',
      url:
        'http://localhost:8765/evcharge/api/SessionsPerEv/' +
        ev +
        '/' +
        datefrom +
        '/' +
        dateto +
        '?format=' +
        format,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'XOBSERVATORY-AUTH': token,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

exports.postSessionsPerProvider = (Provider, datefrom, dateto, format) => {
  const token = readToken();
  if (token) {
    axios({
      method: 'get',
      url:
        'http://localhost:8765/evcharge/api/SessionsPerProvider/' +
        Provider +
        '/' +
        datefrom +
        '/' +
        dateto +
        '?format=' +
        format,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'XOBSERVATORY-AUTH': token,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

exports.usermod = options => {
  const usermod = options.usermod;
  const users = options.users;
  const sessionupd = options.sessionupd;
  const username = options.username;
  const password = options.passw;
  const email = options.email;
  const rank = options.rank;
  const source = options.source;
  const token = readToken();
  // console.log(options);
  // console.log(typeof username);
  // console.log(password);
  // console.log(email);
  // console.log(rank);
  // console.log(usermod);

  //usermod
  if (token) {
    if (usermod && !users) {
      if (username && password && email && rank) {
        var data = {
          rank: rank,
          email: email,
        };
        axios({
          method: 'post',
          url:
            'http://localhost:8765/evcharge/api/admin/usermod/' +
            username +
            '/' +
            password,
          headers: {
            'Content-Type': 'application/json',
            'XOBSERVATORY-AUTH': token,
          },
          data: data,
        })
          .then(function (response) {
            // console.log(response.data);
            console.log(token);
          })
          .catch(function (error) {
            // console.log(error);
            console.log(error.response.data);
          });
      } else
        console.log(
          'You must use all 4 options. (usename, passw, email, rank)'
        );
    }

    //users
    if (users && !usermod) {
      if (username) {
        axios({
          method: 'get',
          url: 'http://localhost:8765/evcharge/api/admin/users/' + username,
          headers: {
            'Content-Type': 'application/json',
            'XOBSERVATORY-AUTH': token,
          },
        })
          .then(function (response) {
            // console.log(response.data);
            console.log(response.data.username);
            console.log(token);
            console.log(homedir);
          })
          .catch(function (error) {
            // console.log(error);
            console.log(error.response.data);
          });
      } else console.log('You must give a name using the username option.');
    }
    //file upload
    if (sessionupd) {
      if (source) {
        var data = new FormData();
        data.append('file', fs.createReadStream(source));

        axios({
          method: 'post',
          url: 'http://localhost:8765/evcharge/api/admin/system/sessionsupd',
          headers: {
            'Content-Type': 'application/json',
            'XOBSERVATORY-AUTH': token,
            ...data.getHeaders(),
          },
          data: data,
        })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else
      console.log('You must give the location of the file in your computer.');
  }
};
// const tokeni = function () {
//   fs.readFile(tokenPath, 'utf8', (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     return new promise(data);
//   });
// };

// exports.postLogout = () => {
//   const token = tokeni()
//     .then(token => {
//       console.log(token);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
