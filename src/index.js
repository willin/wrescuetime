const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.Accept = 'application/json';
axios.defaults.baseURL = 'https://www.rescuetime.com/anapi';
axios.interceptors.response.use(({ data }) => data, error => Promise.reject(error));

module.exports = key => ({
  analyticData: form => axios.get('/data', { type: 'json', params: { key, ...form } }),
  dailySummaryFeed: form => axios.get('/daily_summary_feed', { params: { key, ...form } }),
  alertsFeed: form => axios.get('/alerts_feed', { param: { key, ...form } }),
  highlightsFeed: form => axios.get('/highlights_feed', { params: { key, ...form } }),
  highlightsPost: form => axios.post('/highlights_post', undefined, { params: { key, ...form } })
});
