const { resolve } = require('path');

const aliasPathNames = ['components', 'states', 'clients', 'container', 'domain', 'public'];

module.exports = {
    env: {
        FB_PROJECT_ID: 'academy-presenter',
        FB_API_KEY: 'AIzaSyAT9K_biZLPD-v36v0pe5h1nJMD5MjyhRU',
        FB_APP_ID: '1:797547530919:web:154bda5729ee73c91be982',
    },
    webpack(config, options) {
        aliasPathNames.forEach((name) => {
            config.resolve.alias[`@${name}`] = resolve(__dirname, name);
        });
        return config;
    }
};
