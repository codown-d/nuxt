/**
 * Created by for on 2018/11/24.
 */

exports.sendMsg = (code,msg) => {
  return {
    state: code,
    message: msg,
    timer:new Date().getTime()
  }
}

exports.getIp = function(req) {
  var ip = req.headers['x-forwarded-for']||
    req.headers['x-real-ip'] ||
    req.socket.remoteAddress || '';
  if(ip.split(',').length>0){
    ip = ip.split(',')[0];
  }
  return ip;
};
