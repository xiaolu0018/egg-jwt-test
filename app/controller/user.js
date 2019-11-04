'use strict'

const crypto = require('crypto')
const Controller = require('./baseController')
class UserController extends Controller {
	async loginIn() {
		const {ctx,app} = this;
		const params = ctx.request.body || {}
		if (params.user && params.psd) {
			const user = await ctx.service.user.loginIn(params.user)
			if (user && user.name && user.user_id) {
        const md5 = crypto.createHash('md5')
        let psd = md5.update(params.psd).digest('hex')//psd加密
				if (user.psd && user.psd === psd) {
          //sid
          // let si = ctx.helper.getAES(user.user_id);//AES加密
         await app.sessionStore.set(user.user_id.toString(),Date.now() + app.expires);

         ctx.cookies.set("sId",JSON.stringify(user.user_id) ,{
            maxAge: 1 * 600 * 1000,//10min
            httpOnly:true,
            signed: true,
            encrypt:true
          })
					this.success(user.name)
				} else {
          ctx.cookies.set("sId",'');
					this.noResult('密码错误')
				}
			} else {
        ctx.cookies.set("sId",'');
				this.noResult('没有注册')
			}
		} else {
      ctx.cookies.set("sId",'');
			this.error('缺少必要参数')
		}
	}
	async getUserInfo() {
    const {ctx,app} = this;
    const sId = ctx.cookies.get('sId', {
      signed: true,
      encrypt:true
    });
		if (sId) {
      let res = await ctx.service.user.getUserInfo(sId);
			if (res && res.name) {
				this.success(res.name)
			} else {
				this.noResult('用户未登录')
			}
		} else {
			this.noResult('用户未登录')
		}
	}
	async sysLogoutNew() {
    //退出
    const {ctx,app} = this;
    //去掉ssid
    const sId = ctx.cookies.get('sId', {
      signed: true,
      encrypt:true
    });
    await app.sessionStore.destroy(sId.toString());
    ctx.cookies.set("sId",'',{
      maxAge: 1 ,
      httpOnly:true
    });
		ctx.status = 200
		ctx.body = {
			success: true,
			message: 'login out success'
		}
	}
}

module.exports = UserController
