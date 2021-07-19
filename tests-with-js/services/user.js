
const { NO_CONTENT } = require('http-status');

const users = [
    {
      "id": 1,
      "first_name": "Gustavo",
      "last_name": "Aguiar",
    },
    {
      "id": 2,
      "first_name": "Fulano",
      "last_name": "Cicraco",
    }
];

module.exports = {
    get: (id) => users.find(user => user.id === parseInt(id))
}
