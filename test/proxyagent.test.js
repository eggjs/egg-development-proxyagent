'use strict';

const mm = require('egg-mock');
const assert = require('assert');
const proxy = require('proxy');
const http = require('http');
const request = require('supertest');

describe('test/proxyagent.test.js', () => {
  let app;
  let httpPort;
  let httpServer;
  let proxyServer;
  let proxyPort;

  before(done => {
    // setup target HTTP server
    httpServer = http.createServer();
    httpServer.listen(() => {
      httpPort = httpServer.address().port;
      done();
    });
  });

  before(done => {
    proxyServer = proxy();
    proxyServer.listen(() => {
      proxyPort = proxyServer.address().port;
      done();
    });
  });

  before(() => {
    process.env.http_proxy = 'http://127.0.0.1:' + proxyPort;
    mm.env('local');
    app = mm.app({
      baseDir: 'apps/proxyagent-test',
      cache: false,
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  after(done => {
    proxyServer.once('close', function() { done(); });
    proxyServer.close();
  });

  after(done => {
    httpServer.once('close', function() { done(); });
    httpServer.close();
  });

  it('should make http request over http proxy', function* () {
    httpServer.once('request', (req, res) => {
      res.end(JSON.stringify(req.headers));
    });

    const uri = 'http://127.0.0.1:' + httpPort + '/test';
    const result = yield request(app.callback()).get(`/?q=${encodeURIComponent(uri)}`);
    assert(result.body.data.host === '127.0.0.1:' + httpPort);
    assert(result.body.data.via.indexOf('proxy') !== -1);
  });
});
