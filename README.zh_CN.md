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

互联网时代，无数服务是基于 HTTP 协议进行通信的，web 应用调用后端 HTTP 服务是一种非常常见的应用场景。

为此 egg 框架 内置实现了一个 [httpclient](https://eggjs.org/zh-cn/core/httpclient)，应用可以非常便捷地完成任何 HTTP 请求。

而本插件用于对 httpclient 的请求提供抓包调试辅助功能。

## 安装插件

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

## 使用方式

插件只会在 `local` 环境内打开，会覆盖 egg 内部 httpclient 的 `agent` 和 `httpsAgent` 参数，所以作用范围是全局的。你可以使用 http 协议来代理 HTTP, HTTPS 请求。

插件遵循 Bash 中设置代理的环境变量 `http_proxy` 或 `HTTP_PROXY`，你也可以在启动应用的时候定义：

```bash
$ http_proxy=http://127.0.0.1:8888 node index.js
```

### HTTPS 请求抓包

默认会将 `httpproxy` 配置传递给 urllib 的 `httpsAgent`，并且传递 `rejectUnauthorized = false`，不过在使用自签证书时需要配置证书，具体方法如下：

> `ca` String | Buffer | Array - An array of strings or Buffers of trusted certificates. If this is omitted several well known "root" CAs will be used, like VeriSign. These are used to authorize connections. Notes: This is necessary only if the server uses the self-signed certificate

```js
// config/config.default.js
exports.proxyagent = {
  ca: 'xxxxxxxxxxxx'
};
```

### 抓包工具

**注意：本插件并不包含抓包工具**，你需使用以下工具配套使用：

- [charles](https://www.charlesproxy.com/)
- [fiddler](http://www.telerik.com/fiddler)
- [anyproxy](https://github.com/alibaba/anyproxy) 是 node 版的抓包工具, 提供了 web 控制台, 可以替代 charles

```bash
$ npm install anyproxy -g
$ anyproxy --port 8888
$ open http://localhost:8002
```

效果截图：

![anyproxy](https://cloud.githubusercontent.com/assets/227713/21976937/06a63694-dc0f-11e6-98b5-e9e279c4867c.png)

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
