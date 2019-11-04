'use strict'

const Controller = require('./baseController')

class ClientController extends Controller {
	async list() {
		const ctx = this.ctx
    const par = ctx.request.body || {}
		const res = await ctx.service.client.getList(par)
    this.success(res)
  }
  async getDetail(){
    const ctx = this.ctx
    const par = ctx.request.body || {}
    const res = await ctx.service.client.getDetail(par)
    if(res){
      this.success(res)
    }else{
      this.error('数据为空')
    }

  }
  async saveEdit(){//编辑
    const ctx = this.ctx
    const par = ctx.request.body || {}
    const res = await ctx.service.client.saveEdit(par)
    if(res && !res.err){
      this.success(res)
    }else{
      this.noResult(res.msg ? res.msg : '失败')
    }

  }
  async addClient(){
    const ctx = this.ctx
    const par = ctx.request.body || {}
    if(!par.ip || !par.client_name || !par.bar_id){
      this.noResult('缺少参数');
    }else{
      const res = await ctx.service.client.addClient(par)
      if(res && !res.err){
        this.success(res)
      }else{
        this.noResult(res.msg ? res.msg : '失败')
      }
    }
  }
  async delClient(){
    const ctx = this.ctx
    const par = ctx.request.body || {}
    if(!par.client_id){
      this.noResult('缺少参数');
    }else{
      const res = await ctx.service.client.delClient(par)
      if(res && !res.err){
        this.success(res)
      }else{
        this.noResult(res.msg ? res.msg : '失败')
      }
    }
  }
}

module.exports = ClientController
