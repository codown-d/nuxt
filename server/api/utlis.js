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
