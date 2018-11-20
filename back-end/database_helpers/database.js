const mongoose = require('mongoose');
// const mongoDB = require('../../config');

const db = mongoose.connection;

const mongoDB = 'mongodb://user1:abcd1234@ds255320.mlab.com:55320/random_users';

mongoose.connect(mongoDB, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
})

mongoose.set('useCreateIndex', true);


db.on('error', function () {
  console.log('mongoose connection error:');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  dob: String,
  age: Number,
  bigImage: String,
  image: String,
  nationality: String,
  phone: String,
  cell: String,
  gender: String,
  username: String,
  password: String,
  cellPhone: String,
  street: String,
  city: String,
  zip: Number,
  state: String,
  id: Number,
  dateOfRegistration: String,
  yearsOfRegistration: Number,
  about: String
})

const User = mongoose.model('User', userSchema);

const saveUser = (userObject, response) => {
  const newUser = new User(userObject);
  newUser.save(error => {
    if (error) {
      console.log(`error saving user into database saveuser function ${error}`)
    } else {
      console.log(`successfully saved user into database`)
    }
  })
}

const query = User.find();

const findUser = callback => {
  query.limit(30).select('_id fullName cellPhone image email dateOfRegistration yearsOfRegistration city').exec(callback);
}

const findSingleUserByName = (name, callback) => {
  User.find({ fullName: name })
    .select('fullName bigImage username email dob age image nationality phone cell gender password cellPhone street city zip state id dateOfRegistration yearsOfRegistration about').exec(callback);
}

const updateUserPhoneNumber = (id, number, callback) => {
  User.updateOne({ _id: id}, {$set: { cellPhone: number}}).exec(callback);
}

const addAboutMe = (id, about, callback) => {
  User.updateOne({ _id: id}, {$set: { about: about}}).exec(callback);
}

module.exports = {
  User,
  saveUser,
  findUser,
  findSingleUserByName,
  updateUserPhoneNumber,
  addAboutMe
}