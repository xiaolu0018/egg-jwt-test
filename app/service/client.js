const Service = require('egg').Service;

class UserService extends Service {
    //TODO CURD 增删改查
  async getList(par) {
    let page = Number(par.page) || 1;
    let size = Number(par.size) || 20;
    let seaBar = par.seaBar || null;
    let seaCli = par.seaCli || null;
    let sql = `SELECT SQL_CALC_FOUND_ROWS a.client_id,a.client_name,a.bar_id,INET_NTOA(a.ip) AS ipStr,a.mac AS macStr,a.startup_solution_id,a.is_disable,DATE_FORMAT( a.add_time ,'%Y-%m-%d %H:%i') AS addTimeStr,b.bar_name
    FROM bar_client a
    LEFT JOIN bar b
    ON a.bar_id = b.bar_id
    ${seaCli || seaBar ?
      `WHERE ${seaCli ? `client_name Like "%${seaCli}%"` : ''} ${seaCli && seaBar ? 'AND' : ''} ${seaBar ? `bar_name Like "%${seaBar}%"` : ''}`
      : '' }
    LIMIT ${page*size - size} , ${page*size}`;
    const res = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('SELECT FOUND_ROWS() as sum');
    if(res && total){
      let o = JSON.parse(JSON.stringify(res));
      let t = JSON.parse(JSON.stringify(total))[0].sum;
      return {
        list:o,
        total:t,
        page:page,
        size:size
      }
    }else{
      return null
    }
  }
  async getDetail(par){
    let clientId = par.clientId || null;
    if(clientId){
      const res = await this.app.mysql.query('select INET_NTOA(ip) AS ipStr,bar_id,client_id,client_name from bar_client where client_id =' + clientId);
      if(res){
        let o = JSON.parse(JSON.stringify(res));
        return o[0];
      }else{
        return null;
      }
    }else{
      return null;
    }
  }
  async saveEdit(par){
    if(par && par.client_id){
      const Literal  = this.app.mysql.literals.Literal;
      const res = await this.app.mysql.update('bar_client', {
        ip: new Literal(`INET_ATON('${par.ip}')`),
        client_name:par.client_name,
        bar_id:par.bar_id
      }, {
        where:{
          client_id:par.client_id
        }
      });
      const updateSuccess = res.affectedRows === 1;
      if(updateSuccess){
        return {msg:'修改成功'}
      }else{
        return {msg:'修改失败',err:true}
      }
    }else{
      return {msg:'缺少参数',err:true};
    }
  }
  async addClient(par){
    const Literal  = this.app.mysql.literals.Literal;
    const res = await this.app.mysql.insert('bar_client',{
     ...par,
     ip: new Literal(`INET_ATON('${par.ip}')`)
    })
    if(res && res.affectedRows === 1){
      return {msg:'新增成功'}
    }else{
      return {msg:'新增失败',err:true}
    }
  }
  async delClient(par){
    const res = await this.app.mysql.delete('bar_client',{
      client_id:par.client_id
    })
    if(res && res.affectedRows === 1){
      return {msg:'删除成功'}
    }else{
      return {msg:'删除失败',err:true}
    }
  }
}
module.exports = UserService;