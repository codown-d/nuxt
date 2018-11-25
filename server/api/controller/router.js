/**
 * Created by for on 2018/11/20.
 */
let indexshowController = require('./home') // 主页

exports.indexShow = indexshowController.indexShow // 首页展示
exports.getAddUser = indexshowController.getAddUser
exports.delUser = indexshowController.delUser
exports.updataUser = indexshowController.updataUser
// exports.postAddUser = indexshowController.addUser
