'use strict'
const CONF = require('../db.js')
exports.keys = 'lxlkey12593' //cookies 加密和签名key

exports.security = {
	csrf: {
		enable: false
	}
}
// 添加 view 配置
exports.view = {
	defaultViewEngine: 'nunjucks',
	mapping: {
		'.html': 'nunjucks'
	}
}

const expires = 15 * 60 * 1000;//15分钟 过期时间

exports.middleware = ["valSid"];

exports.valSid = {//中间件配置
  expires:expires,//参数
  // ignore:'/user/loginIn.action',
  // match:/\.action/,
  match(ctx) {
    // 只有 ios 设备才开启
    const reg = /\.action/;
    return ctx.path && reg.test(ctx.path) && !ctx.path.includes('/user/loginIn.action')
  }
};

exports.expires = expires;


exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: CONF.mysql.host,
    user: CONF.mysql.user,
    password: CONF.mysql.password,
    port: CONF.mysql.port,
    database: CONF.mysql.database,
    timezone:"08:00"
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
//ORM模型
// exports.sequelize = {
// 	dialect: 'mysql',
// 	host: CONF.mysql.host,
// 	port: CONF.mysql.port,
// 	database: CONF.mysql.database,
// 	username: CONF.mysql.user,
// 	password: CONF.mysql.password,
// 	timezone: '+08:00', // 东8区设置
// 	pool: {
// 		// 连接池
// 		max: 5,
// 		min: 1,
// 		idle: 10000
// 	},
// 	retry: { max: 3 }
// }
exports.redis = {
	client: {
		port: CONF.redis.port,
		host: CONF.redis.host,
		password: CONF.redis.password,
		db: 0
	}
}
exports.session = {
	key: 'sId',
	maxAge: 24 * 3600 * 1000, // 1 天
	httpOnly: true,
	encrypt: true
}
// 添加 news 的配置项
exports.news = {
	pageSize: 5,
	serverUrl: 'https://hacker-news.firebaseio.com/v0'
}



const httpCode = {
  'noLogin':{
    data:{
      success:false,
      message:'用户未登录'
    },
    code:202
  },
  'noFound':{
    data:{
      success:false,
      message:'未找到'
    },
    code:404
  },
  'noRight':{
    data:{
      success:false,
      message:'没有权限'
    },
    code:555
  },
  'timeout':{
    data:{
      success:false,
      message:'超时'
    },
    code:500
  },
  'noGet':{//未知
    data:{
      success:false,
      message:'数据异常'
    },
    code:400
  },
}
