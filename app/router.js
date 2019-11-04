'use strict';

module.exports = app => {
  const { router, controller } = app;

  //user
  router.post('/user/loginIn.action',controller.user.loginIn);//登录
  router.post('/user/getUserInfo.action',controller.user.getUserInfo);//用户信息
  router.get('/user/sysLogoutNew.action',controller.user.sysLogoutNew);//退出
  //news
  router.get('/news', controller.news.page);
  router.post('/news/list.action',controller.news.list);

  //list CURD
  router.post('/client/list.action',controller.client.list)
  router.post('/client/detail.action',controller.client.getDetail)
  router.post('/client/saveEdit.action',controller.client.saveEdit)
  router.post('/client/add.action',controller.client.addClient)
  router.post('/client/del.action',controller.client.delClient)
  router.post('/bar/list.action',controller.bar.list)//企业列表
  //index.html
  router.get('/*',controller.home.index);
};

