const path = require('path');
const paths = require('react-scripts/config/paths');

module.exports = function override(config, env) {
	//paths.appBuild = path.join(path.dirname(paths.appBuild), 'c2f');

    return config;
}