const request = require('request');

const getDefer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

class Wr {
  constructor(key) {
    this.key = key;
  }

  getData(form) {
    /* eslint-disable no-param-reassign */
    form.key = this.key;
    form.type = 'json';
    const deferred = getDefer();
    request({
      method: 'POST',
      url: 'https://www.rescuetime.com/anapi/data',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      timeout: 10000,
      form
    }, (err, res) => {
      if (err) {
        deferred.reject(err);
      } else {
        try {
          deferred.resolve(JSON.parse(res.body));
        } catch (e) {
          deferred.reject(err);
        }
      }
    });
    return deferred.promise;
  }
}

module.exports = Wr;
