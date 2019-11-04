'use strict';

const assert = require('assert');

const Default_Time = 1000 * 60 * 60;//redis 数据缓存时间60分钟

module.exports = app => {
  const name = app.config.redis.name;
  const redis = name ? app.redis.get(name) : app.redis;
  assert(redis, `redis instance [${name}] not exists`);

  app.sessionStore = {
    async get(key) {
      const res = await app.redis.get(key);
      if (!res) return null;
      return JSON.parse(res);
    },

    async set(key, value, maxAge) {
      maxAge = typeof maxAge === 'number' ? maxAge : Default_Time;
      value = JSON.stringify(value);
      await app.redis.set(key, value, 'PX', maxAge);
    },

    async destroy(key) {
      await app.redis.del(key);
    },
  };
};