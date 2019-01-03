import Routers from './router'
import Repetition from './Repetition'
import {getKey, genKey, isEqualObj, _defineProperty} from './utils'

export default {
  install: (Vue, {router, keyName = 'WXK'} = {}) => {
    if (!router) {
      throw new Error('this component need options router')
    }

    router.beforeEach((to, from, next) => {    // 在进入之前，检查sessionStorage里面保存的已经打开的页面的记录，如果有记录，则将之前的标识码拿过来用，如果没有，则从新创建一个标识码，然后放到query里面，next出去
      if (!to.query[keyName]) {    //
        let query = {...to.query}
        let routers = Routers
        let dif = true
        for (let route of routers) {
          if (route[1].path === to.path && isEqualObj(Object.assign({}, to.query, _defineProperty({}, keyName, null)), Object.assign({}, route[1].query, _defineProperty({}, keyName, null)))) {
            dif = false
            query[keyName] = route[1].query[keyName]
            next({name: to.name, params: to.params, query: query})
            return
          }
        }
        if (dif) {
          query[keyName] = genKey()
          next({name: to.name, params: to.params, query: query})
        }
      } else {
        next()
      }
    })

    router.afterEach((to, from) => {      // 判断这次进入的地址在sessionStorage里面是否存在，如果存在就直接出去， 如果不存在就存进sessionStorage
      let routers = Routers
      const name = getKey(to, keyName)
      for (let route of routers) {
        if (route.indexOf(name) > -1) {
          return
        }
      }
      routers.push([name, {name: to.name, query: to.query, path: to.path}])
      window.sessionStorage.WX_REPETITION = JSON.stringify(routers)
    })

    Vue.component('repetition', Repetition(keyName))    // 注册该组件
  }
}
