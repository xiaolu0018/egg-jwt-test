'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async page() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    await ctx.render('news/list.html');
  }
   list() {
    const ctx = this.ctx;
    const page = ctx.request.body.page || 1;
    let id = ctx.request.body.id || null;
    if(id){
      ctx.status = 200;
      ctx.body = {
        success:true,
        dataList:[
          {
            time:'2019-01-11',
            remark:'new test reamkr',
            page:page
          }
        ]
      };
    }else{
      ctx.status = 404;
      ctx.body = {
        success:false,
        message:'no id validate'
      }
    }

  }
}

module.exports = NewsController;