'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = yield this.curl(this.query.q, { dataType: 'json' });
  });
};
