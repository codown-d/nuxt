/**
 * Created by for on 2018/11/21.
 */
const {Router} = require('express');
// 目录1：/user   创建Router
// let Router = express.Router();

let databases = require('./controller/interface')

let router = Router()

// Add databases Routes
router.use(databases)

module.exports = router
