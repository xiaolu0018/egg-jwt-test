// app/core/base_controller.js
const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }
  success(data) {
    this.ctx.status = 200;
    this.ctx.body = {
      success: true,
      data,
    };
  }
  noResult(msg = '数据为空'){
    this.ctx.status = 200;
    this.ctx.body = {
      success: false,
      message:msg,
      data:null
    };
  }
  error(msg) {
    msg = msg || 'not found';
    this.ctx.status = 455;
    this.ctx.body = {
      success: false,
      message:msg
    };
  }
}
module.exports = BaseController;