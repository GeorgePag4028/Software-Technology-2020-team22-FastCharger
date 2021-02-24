const User = require('../models/user');

exports.postUser = (req, res, next) => {
  console.log('We are in create/update User route');

  // prepei na ulopoihsoume edw to prwto endpoint
  //Υποστηρίζει τη μέθοδο POST για την προσθήκη νέου χρήστη ή την αλλαγή password αν ο χρήστης υπάρχει ήδη.
};

exports.getUser = (req, res, next) => {
  console.log('We are in get user  route');
  const rank = req.body.rank;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
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

  //Υποστηρίζει τη μέθοδο GET για την ανάγνωση των στοιχείων του συγκεκριμένου χρήστ
};

exports.postFileUpload = (req, res, next) => {
  console.log('We are in the Admins session  route');
  //Υποστηρίζει τη μέθοδο POST για το «ανέβασμα» αρχείου CSV με δεδομένα γεγονότων φόρτισης. Το αρχείο πρέπει να είναι κωδικοποιημένο ως πεδίο "file" σε multipart/form-data κωδικοποίηση
};
