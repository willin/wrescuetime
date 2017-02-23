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

## 示例

![status](http://singap.sh.gg:3333/icon)

上图有三种状态：

* 红色：忙碌中，请勿打扰
* 绿色：在线
* 灰色：离线

服务器代码(使用`koa@next`、`koa-route@next`和`moment`实现)：

```js
app.use(route.get('/icon', async (ctx) => {
  let data = await redis.get('rescuetime');
  if (data === null) {
    data = await wr.getData({
      rs: 'minute',
      pv: 'interval',
      rk: 'efficiency'
    });
    await redis.setex('rescuetime', 60, JSON.stringify(data));
  } else {
    data = JSON.parse(data);
  }
  const row = data.rows[data.rows.length - 1];
  const time = Math.abs(moment(row[0]).diff()) / 60000;
  const efficiency = parseFloat(row[4]);
  
  if (time > 60) {
    ctx.redirect('https://go.sh.gg/images/offline.png');
  } else {
    if (efficiency > 90) {
      ctx.redirect('https://go.sh.gg/images/busy.png');
    }
    else {
      ctx.redirect('https://go.sh.gg/images/online.png');
    }
  }
}));
```

说明：

* 时间差（分钟）大于60判断为离线
* 效率大于90%判断为忙碌，请勿打扰
* 其他在线状况则显示默认在线

## License

MIT

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)


