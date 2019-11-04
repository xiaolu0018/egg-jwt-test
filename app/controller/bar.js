'use strict'

const Controller = require('./baseController')

class BarController extends Controller {
	async list() {
		const ctx = this.ctx
    const res = await ctx.service.bar.getList()
    if(res){
      this.success(res)
    }else{
      this.error({
        message:'数据异常'
      })
    }

  }

}

module.exports = BarController
