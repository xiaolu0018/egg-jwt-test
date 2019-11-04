const moment = require('moment')
const crypto = require('crypto')

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow()

exports.dateFormat = date => {
	date = Number.parseInt(date) * 1000
	return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

const keys = 'testnekklistm' //密钥

exports.getAES = (data, key = keys) => {
  //加密
  if(!data){
    return '';
  }
	const cipher = crypto.createCipher('aes192', key)
	let crypted = cipher.update(data.toString(), 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

exports.getDAes = (data, key = keys) => {
  //解密
  if(!data){
    return '';
  }
	const decipher = crypto.createDecipher('aes192', key)
	let decrypted = decipher.update(data.toString(), 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}
