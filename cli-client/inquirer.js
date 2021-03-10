const inquirer = require('inquirer');
const { prompt } = require('inquirer');

const loginQuestions = [
  {
    type: 'input',
    name: 'username',
    message: 'Enter your urername',
  },
  {
    type: 'input',
    name: 'password',
    message: 'Enter your password',
  },
];

module.exports = {
  loginQuestions,
};
