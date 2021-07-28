const fetch = require('node-fetch');

const getDog = async ({ name: name }) => {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${name}/images/random`);
        return await response.json();
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getDog
};
