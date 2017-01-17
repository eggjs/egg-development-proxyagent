# egg-development-proxyagent

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-development-proxyagent.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-development-proxyagent
[travis-image]: https://img.shields.io/travis/eggjs/egg-development-proxyagent.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-development-proxyagent
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-development-proxyagent.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-development-proxyagent?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-development-proxyagent.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-development-proxyagent
[snyk-image]: https://snyk.io/test/npm/egg-development-proxyagent/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-development-proxyagent
[download-image]: https://img.shields.io/npm/dm/egg-development-proxyagent.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-development-proxyagent

Nowadays lots of services are built upon HTTP protocol. So it's quite common to invoke backend services based on HTTP.

There is a built-in [httpclient](https://eggjs.org/zh-cn/core/httpclient) in Egg framework so that we can use it to invoke HTTP services easily.

This plugin provides a way of capturing HTTP request for debugging purpose.

## Install

```bash
npm i egg-development-proxyagent --save
```

```js
// config/plugin.js
exports.proxyagent = {
  enable: true,
  package: 'egg-development-proxyagent',
};
```

## Usage

This plugin will take effect only in `local` env. Because it overrides the `agent` and `httpsAgent` of httpclient, so it will work for every request. And also you can delegate HTTPS requests via HTTP.

`http_proxy` or `HTTP_PROXY` environment variable will be used if set in Bash. Or you can specify it when you start app:

```bash
$ http_proxy=http://127.0.0.1:8888 node index.js
```

### Capturing HTTPS Traffic

By default the `http_proxy`(or `HTTP_PROXY`) mentioned above will be passed to `httpsAgent` of urllib, and `rejectUnauthorized = false` will be set.

However, when using self-signed certificate we need to configure the certificate, shown as follows:

> `ca` String | Buffer | Array - An array of strings or Buffers of trusted certificates. If this is omitted several well known "root" CAs will be used, like VeriSign. These are used to authorize connections. Notes: This is necessary only if the server uses the self-signed certificate

```js
// config/config.default.js
exports.proxyagent = {
  ca: 'xxxxxxxxxxxx',
};
```

### Capturing Tool

**Note: Capturing tool is not in this plugin**, you can use one of them below:

- [charles](https://www.charlesproxy.com/)
- [fiddler](http://www.telerik.com/fiddler)
- [anyproxy](https://github.com/alibaba/anyproxy) is a capturing tool writtern in node. It provides a web console, it's a good replacement of charles.

```bash
$ npm install anyproxy -g
$ anyproxy --port 8888
$ open http://localhost:8002
```

Screenshot:

![anyproxy](https://cloud.githubusercontent.com/assets/227713/21976937/06a63694-dc0f-11e6-98b5-e9e279c4867c.png)

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
