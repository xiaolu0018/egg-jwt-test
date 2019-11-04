const Service = require('egg').Service;

class BarService extends Service {
  async getList(){
    const res = await this.app.mysql.select('bar',{
      columns: ['bar_id', 'bar_name']
    });
    if(res){
      return JSON.parse(JSON.stringify(res))
    }else{
      return null;
    }
  }
}
module.exports = BarService