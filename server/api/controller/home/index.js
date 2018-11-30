/**
 * Created by for on 2018/11/20.
 */
const db = require('../../model/db.js')
const sql = require('../../model/sql.js')
const url = require('url')
let {sendMsg, getIp} = require('../../utlis')
let request = require("request")

// 引入redis
/**
 *  index show
 */
exports.indexShow = (req, res, next) => {
  db.query(sql.index, function (err, rows, fields) {
    if (err) {
      throw err
    }
    let result = JSON.parse(JSON.stringify(rows))
    res.json(result)
    // 检查是否存在获取值（redis）
  })
}
exports.getIpList = (req, res, next) => {
  db.query(sql.iplist(), function (err, rows, fields) {
    if (err) {
      throw err
    }
    let result = JSON.parse(JSON.stringify(rows))
    res.json(result)
    // 检查是否存在获取值（redis）
  })
}
let reqAddress = function (ip) {
  let promise = new Promise(function (resolve, reject) {
    request('http://ip.taobao.com/service/getIpInfo.php?ip=' + ip, function (error, response, data) {
      if (error) {
        resolve(error)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
  return promise
}
exports.getCount = (req, res, next) => {
  var clientIp =getIp(req)
  db.query(sql.findip({ip: clientIp}), async function (err, rows, fields) {
    if (err) {
      throw err
    }
    let result = JSON.parse(JSON.stringify(rows))
    if(result.length===0){
      result=[{ip:clientIp,count:0,address:''}]
    }
    let address = result[0].address
    if(!address){
      let {data} = await reqAddress(clientIp)
      address = data.country +' '+ data.region +'市 '+ data.city
    }
    let data = Object.assign({}, result[0], {address: address})
    console.log(data)
    db.query(sql.addguest(data), function (err, rows1, fields) {
      if (err) {
        throw err
      }
      let result = JSON.parse(JSON.stringify(rows1))
      if (result.changedRows == 1) {
        db.query(sql.findip({ip: clientIp}), function (err, rows, fields) {
          if (err) {
            throw err
          }
          let result = JSON.parse(JSON.stringify(rows))
          res.json(result)
        })
      } else {
        res.json(sendMsg(200, rows.message))
      }
    })
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
exports.getAddUser = (req, res, next) => {
  let params = url.parse(req.url, true)
  console.log(params)
  db.query(sql.addUser({
    id: params.query.id,
    name: params.query.name,
    age: params.query.age,
    address: params.query.address,
    role: params.query.role
  }), function (err, rows, fields) {
    if (err) {
      throw err
    }
    res.json(sendMsg(200, rows.message))
    // 检查是否存在获取值（redis）
  })
}
exports.delUser = (req, res, next) => {
  let params = url.parse(req.url, true)
  db.query(sql.delUser({
    id: params.query.id,
    name: params.query.name,
    age: params.query.age,
    address: params.query.address,
    role: params.query.role
  }), function (err, rows, fields) {
    if (err) {
      throw err
    }
    res.json(sendMsg(200, rows.message))
    // 检查是否存在获取值（redis）
  })
}
exports.updataUser = (req, res, next) => {
  let params = url.parse(req.url, true)
  db.query(sql.updataUser({
    id: params.query.id,
    name: params.query.name,
    age: params.query.age,
    address: params.query.address,
    role: params.query.role
  }), function (err, rows, fields) {
    if (err) {
      throw err
    }
    res.json(sendMsg(200, rows.message))
    // 检查是否存在获取值（redis）
  })
}

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
