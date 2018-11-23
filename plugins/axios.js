/**
 * Created by for on 2018/11/23.
 */
import Vue from 'vue'

var vm = new Vue({})    //获取vue实例
export default function ({ $axios, redirect }) {

  $axios.onRequest(config => {
    if (process.browser) {    //判断是否为客户端（必须）
      vm.$loading();
    }
  })

  $axios.onResponse(response=>{
    if (process.browser) {    //判断是否为客户端（必须）
      let load = vm.$loading();
      load.close();
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
