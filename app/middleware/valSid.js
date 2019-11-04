'use strict'

module.exports = (option, app) => {
	/*
	 * 校验sId
	 * */
	return async function(ctx, next) {
		try {
			const sid = ctx.cookies.get('sId', {
				signed: true,
				encrypt: true
			}) //null;//sessionId
			if (sid) {
				/*
				 *TOOD 获取cookie后去除多余引号,解密
				 */
        // let sid = ctx.helper.getDAes(i.replace(/\"/g, "").replace(/\'/g, ""));

				let sidExpir = await app.sessionStore.get(sid.toString())
				if (sidExpir) {
					if (Number(sidExpir) && Number(sidExpir) > Date.now()) {
						//过期
						ctx.body = {
							success: false,
							message: '未登录'
						}
					} else {
						//重置过期时间
						await app.sessionStore.set(
							sid.toString(),
							Date.now() + option.expires
						)
					}
				} else {
					ctx.body = {
						success: false,
						message: '未登录'
					}
				}
			} else {
				ctx.body = {
					success: false,
					message: '未登录'
				}
			}
      await next()

		} catch (err) {
			// 所有的异常都在 app 上触发一个 error 事件，会自动记录一条错误日志
			app.emit('error', err, this)
			const status = err.status || 500
			// 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
			const error =
				status === 500 && app.config.env === 'prod' ? '请稍后重试' : err.message
			// 从 error 对象上读出各个属性，设置到响应中
			ctx.body = { success:false,message:error }
			ctx.status = status
		}
	}
}
