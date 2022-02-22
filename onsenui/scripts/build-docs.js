const path = require('path');

const docsBuilder = require('../docs/wcdoc');

docsBuilder.build(path.join(__dirname, '../build/docs'));
