# WRescuetime

[![npm](https://img.shields.io/npm/v/wrescuetime.svg?style=plastic)](https://npmjs.org/package/wrescuetime) [![npm](https://img.shields.io/npm/dm/wrescuetime.svg?style=plastic)](https://npmjs.org/package/wrescuetime) [![npm](https://img.shields.io/npm/dt/wrescuetime.svg?style=plastic)](https://npmjs.org/package/wrescuetime)

## 介绍

[RescueTime](https://www.rescuetime.com/ref/1496575) 是一个效率分析的软件，它可以全天候记录你的在线操作，并进行效率分析。

配合`Gyroscope`（iOS APP）、`IFTTT`等使用有奇效。并且可以自行 DIY新的玩法。

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

## 教程示例

此图为我的在线状态：

![status](https://up.js.cool/willin/icon)

此图为另一个小伙伴：

![status](https://up.js.cool/zhangyf/icon)

上图有三种状态：

* 红色：忙碌中，请勿打扰
* 绿色：在线
* 灰色：离线

### 分步教程

#### 1.注册安装 RescueTime

注册链接： [https://www.rescuetime.com/](https://www.rescuetime.com/ref/1496575)

下载并安装客户端，支持的环境有：

* Mac OS X: 10.6以上
* Windows: XP/Vista/7/8/10
* Linux: Ubuntu/Fedora
* Android: 2.1以上（需要 Google Play）
* Chrome 插件
* Firefox 插件

安装完成后，通过 [API & Integrations](https://www.rescuetime.com/anapi/setup/overview) 链接新建 API Key。

#### 2. 搭建测试环境


服务器代码(使用`koa@next`、`koa-route@next`和`moment`实现)：

```js
const Wr = require('wrescuetime');
const moment = require('moment');
const Koa = require('koa');
const route = require('koa-route');
const redisClient = require('wulian-redis');

const wr = new Wr('输入你的 Key');
moment.locale('zh-CN');
const redis = redisClient();

const app = new Koa();

// 核心代码
// JSON 格式输出
app.use(route.get('/', async (ctx) => {
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
  ctx.body = {
    status: 1,
    time,
    efficiency,
    date: row[0]
  }; 
}));

// 图片链接跳转
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
    ctx.redirect('http://example.com/offline.png');
  } else {
    if (efficiency > 90) {
      ctx.redirect('http://example.com/busy.png');
    }
    else {
      ctx.redirect('http://example.com/online.png');
    }
  }
}));

app.listen(3000);
```

说明：

* 时间差（分钟）大于60判断为离线
* 效率大于90%判断为忙碌，请勿打扰
* 其他在线状况则显示默认在线

## License

MIT

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)


