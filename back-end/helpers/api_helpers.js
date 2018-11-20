const request = require('request');

const randomuser = callback => {
  const options = {
    method: 'GET',
    url: 'https://randomuser.me/api/?results=20'
  };
  request(options, callback);
}

module.exports.randomuser = randomuser;
