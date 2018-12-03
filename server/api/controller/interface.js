/**
 * Created by for on 2018/11/20.
 */
const {Router} = require('express');

const myrouter = require('./router.js')
let router = Router()
// index router
router.get('/u', myrouter.indexShow)
router.get('/getiplist', myrouter.getIpList)
router.get('/getcount', myrouter.getCount)
router.get('/getadduser', myrouter.getAddUser)
router.get('/deluser', myrouter.delUser)
router.get('/updatauser', myrouter.updataUser)
// router.post('/postAdduser', myrouter.postAddUser)
// 页面初始化加载一级分类第一个
module.exports =router
