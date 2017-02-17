# WRescuetime

[![npm](https://img.shields.io/npm/v/wrescuetime.svg?style=plastic)](https://npmjs.org/package/wrescuetime) [![npm](https://img.shields.io/npm/dm/wrescuetime.svg?style=plastic)](https://npmjs.org/package/wrescuetime) [![npm](https://img.shields.io/npm/dt/wrescuetime.svg?style=plastic)](https://npmjs.org/package/wrescuetime)

## 安装和使用

国际惯例：

```
npm install wrescuetime --save
```

```js
const Wr = require('wrescuetime');
const wr = new Wr('full_key');

wr.getData({
  rs: 'minute',
  pv: 'interval',
  rk: 'efficiency'
}).then((d) => {
  console.log(d);
});
```

## License

MIT

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)
