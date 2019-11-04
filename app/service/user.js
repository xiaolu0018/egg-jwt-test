const Service = require('egg').Service;

class UserService extends Service {
  async loginIn(name) {
    // 用户登录判断 name => user
    const user = await this.app.mysql.get('user', { name: name });
    if(user){
      let o = JSON.parse(JSON.stringify(user))
      return o
    }else{
      return null
    }
  }
  async getUserInfo(ssid){
    //id => user
    const user = await this.app.mysql.get('user', { user_id: ssid || 1 });
    return user ? JSON.parse(JSON.stringify(user)) : null;
  }
}
module.exports = UserService;