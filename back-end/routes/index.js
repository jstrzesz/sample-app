var express = require('express');
var router = express.Router();
const randomAPI = require('../helpers/api_helpers.js');
const db = require('../database_helpers/database.js');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/randomUsers', function(req, res, next) {
  randomAPI.randomuser((err, response, body) => {
    const parsed = JSON.parse(body);
    const userObject = {};
    parsed.results.forEach((user, index) => {
      console.log(user)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.login.password, salt, (err, hash) => {
          userObject.bigImage = user.picture.large;
          userObject.gender = user.gender;
          userObject.title = user.name.title;
          userObject.fullName = `${user.name.first} ${user.name.last}`;
          userObject.email = user.email;
          userObject.image = user.picture.thumbnail;
          userObject.dob = user.dob.date;
          userObject.age = user.dob.age;
          userObject.nationality = user.nat;
          userObject.cellPhone = user.cell;
          userObject.street = user.location.street;
          userObject.city = user.location.city;
          userObject.state = user.location.state;
          userObject.zip = user.location.postcode;
          userObject.username = user.login.username;
          userObject.password = hash;
          userObject.phone = user.phone;
          userObject.dateOfRegistration = user.registered.date;
          userObject.yearsOfRegistration = user.registered.age;
          userObject.about = '';
          db.saveUser(userObject);
        })
      })
    })
  })
});

router.get('/users', (req, res) => {
  db.findUser((err, users) => {
    if (err) {
      console.error(err);
    } else {
      const displayedUsers = users.map(user => {
        return {
          fullName: user.fullName,
          image: user.image,
          email: user.email,
          phone: user.cellPhone,
          id: user._id,
          registration: user.dateOfRegistration,
          yearsOfRegistration: user.yearsOfRegistration,
          city: user.city
        }
      })
      res.send(displayedUsers);
    }
  })
})

router.post('/input', (req, res) => {
  console.log(req.body.name);
  db.findSingleUserByName(req.body.name, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      let foundUser;
      user.forEach(userInfo => {
        foundUser = userInfo;
        res.send(foundUser);
      })
    }
  })
})

router.post('/updatePhone', (req, res) => {
  console.log(req.body)
  db.updateUserPhoneNumber(req.body.id, req.body.newPhoneNumber, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      res.send(req.body.newPhoneNumber);
    }
  })
})

router.post('/about', (req, res) => {
  console.log(req.body)
  db.addAboutMe(req.body.id, req.body.about, (err, about) => {
    if (err) {
      console.error(err);
    } else {
      res.send(req.body.about);
    }
  })
})

module.exports = router;
