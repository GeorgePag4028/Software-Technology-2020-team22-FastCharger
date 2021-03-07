const User = require('../models/user');
let converter = require('json-2-csv');

//Υποστηρίζει τη μέθοδο POST για την προσθήκη νέου χρήστη ή την αλλαγή password αν ο χρήστης υπάρχει ήδη.
//url: localhost:8765/evcharge/api/admin/usermod/:username/:password
exports.postUser = (req, res, next) => {
  console.log('We are in create/update User route');
  // const username = req.body.username;
  let username = req.param('username');
  let password = req.param('password');
  // const password = req.body.password;
  const email = req.body.email;
  const rank = req.body.rank;
  User.findOne({ where: { username: username } }).then(user => {
    if (user) {
      user
        .update({
          password: password,
        })
        .then(result => {
          console.log('changed password');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      User.create({
        rank: rank,
        username: username,
        password: password,
        email: email,
      })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  // apanthsh pou gurizei
  res.send('<h1>Someone help!</h1>');
};

//Υποστηρίζει τη μέθοδο GET για την ανάγνωση των στοιχείων του συγκεκριμένου χρήστη
// localhost:8765/evcharge/api/admin/users/:username
exports.getUser = (req, res, next) => {
  var username = req.param('username');
  User.findOne({ where: { username: username } })
    .then(user => {
      if (user) {
        if (req.query.format == null || req.query.format == 'json') {
          res.json(user);
        } else if (req.query.format == 'csv') {
          converter.json2csv(user.toJSON(), (err, csv) => {
            if (err) {
              throw err;
            }

            // print CSV string
            res.send(csv);
          });
        } else res.send('<h1>Put right format</h1>');
      } else {
        res.send('<h1>User not found</h1>');
      }
    })
    .catch(err => {
      console.log(err);
    });

  console.log('We are in get user  route');
};

// exports.postFileUpload = (req, res, next) => {
//   console.log('We are in the Admins session  route');
//   const form = formidable({ multiples: true });
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
//       res.end(String(err));
//       return;
//     }
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     // res.end(JSON.stringify({ fields, files }, null, 2));
//     res.end(JSON.stringify({ fields, files }));
//   });

//Υποστηρίζει τη μέθοδο POST για το «ανέβασμα» αρχείου CSV με δεδομένα γεγονότων φόρτισης. Το αρχείο πρέπει να είναι κωδικοποιημένο ως πεδίο "file" σε multipart/form-data κωδικοποίηση
// };
// exports.getUser = (req, res, next) => {
//   var username = req.param('username');
//   User.findOne({ where: { username: username } })
//     .then(user => {
//       if (user) {
//         res.json(user);
//         // .then(result => {
//         //   console.log('changed password');
//         // })
//         // .catch(err => {
//         //   console.log(err);
//         // });
//       } else {
//         res.send('<h1>User not found</h1>');
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });

//   console.log('We are in get user  route');
// };
