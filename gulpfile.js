const del = require('del');

const delGlobs = ['bundles/**'];

function clean(cb) {
	del(delGlobs);
	cb();
}

exports.clean = clean;
