/**
 * Created by for on 2018/11/20.
 */
const db = require('../../model/db.js')
const sql = require('../../model/sql.js')
// const url = require('url')
// 引入redis
/**
 *  index show
 */
exports.indexShow = (req, res, next) => {
  db.query(sql.index, function (err, rows, fields) {
    if (err) {
      console.log(132465)
      throw err
    }
    let result=JSON.parse(JSON.stringify(rows))
    res.json(result)
    // 检查是否存在获取值（redis）
  })
}
/*
exports.addUser = (req, res, next) => {
  let params = req.body
  db.query(`select * from user u where u.name = ${params.name}`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (rows.length) {
      if (rows[0].password === params.password) {
        res.json({
          result: null,
          status: true,
          msg: '登录成功'
        })
      } else {
        res.json({
          result: null,
          status: false,
          msg: '密码错误'
        })
      }
    } else {
      db.query(`INSERT INTO user VALUES(NULL,${params.phone},'${params.password}')`,
        (err, rows, fields) => {
          if (err) {
            throw err
          }
          if (rows.affectedRows) {
            res.json({
              result: null,
              status: true,
              msg: '登录成功'
            })
          } else {
            res.json({
              result: null,
              status: false,
              msg: '注册失败'
            })
          }
        })
    }
  })
}*/
/*exports.getAddUser = (req, res, next) => {
  let params = url.parse(req.url, true)
  db.query(sql.addUser({
    id: params.query.id,
    name: params.query.name,
    age: params.query.age,
    address: params.query.address,
    role: params.query.role
  }),function (err, rows, fields) {
    if (err) {
      throw err
    }
    res.json({statue:200})
    // 检查是否存在获取值（redis）
  })
}*/
/*
exports.postAddUser = (req, res, next) => {
  let params = req.body
  db.query(sql.addUser, {
    id: params.query.id,
    name: params.query.name,
    age: params.query.age,
    address: params.query.address,
    role: params.query.role
  },function (err, rows, fields) {
    if (err) {
      throw err
    }
    let result=JSON.parse(JSON.stringify(rows))
    res.json(result)
    // 检查是否存在获取值（redis）
  })
}*/
