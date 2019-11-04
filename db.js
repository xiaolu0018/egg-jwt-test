module.exports={
  mysql:{
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '123456',
    // 数据库名
    database: 'test_mysql',
  },
  redis:{
    port: 6379, // Redis port
		host: '127.0.0.1', // Redis host
		password: '123456',
  },
  // mongo:{
  //     url:'mongodb://malware_cloud:w0-2=kLa8@192.168.179.49/malware_cloud'
  // },
  staticDir:'/home/mount_disk/malware_sams',
  iconDir:'/home/ybli/IconData'
}