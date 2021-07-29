const jwt = require('jwt-simple');

const decode = (token, {
    key = 'secret',
    noVerify = false,
    algorithm = 'HS256'
} = {}) => {
    return jwt.decode(token, key, noVerify, algorithm);
};

const encode = (payload, {
    key = 'secret',
    algorithm = 'HS256',
    options,
} = {}) => {
    return jwt.encode(payload, key, algorithm, options);
};

module.exports = {
    decode,
    encode,
}
