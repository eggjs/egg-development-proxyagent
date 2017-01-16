'use strict';

const ProxyAgent = require('proxy-agent');

module.exports = app => {
  const logger = app.logger;
  const config = app.config.proxyagent;
  const env = process.env;
  const proxyHost = env.http_proxy || env.HTTP_PROXY;

  if (proxyHost) {
    logger.info(`[egg:proxyagent] Proxing httpclient request to: ${proxyHost} due to environment variable http_proxy`);

    try {
      const proxyAgent = new ProxyAgent(proxyHost);
      app.httpclient.agent = proxyAgent;
      app.httpclient.httpsAgent = proxyAgent;

      const sslNames = [
        'pfx',
        'key',
        'passphrase',
        'cert',
        'ca',
        'ciphers',
        'rejectUnauthorized',
        'secureProtocol',
        'secureOptions',
      ];

      for (let i = 0; i < sslNames.length; i++) {
        const name = sslNames[i];
        if (config.hasOwnProperty(name)) {
          app.httpclient[name] = config[name];
        }
      }
    } catch (error) {
      logger.error('[proxyagent] Unknown proxy type, see https://github.com/eggjs/egg-development-proxyagent for more infomation.');
    }
  }
};
