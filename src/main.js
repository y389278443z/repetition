import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import Home from './components/home.vue'
import List from './components/list.vue'
import HomePart from './components/homepart'

import Repetition from './components/repetition/index'


Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'homepart',
      component: HomePart,
      redirect: 'home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/list/:listId',
          name: 'list',
          components: {
            repet: List
          },
          meta: {
            title: '列表页面'
          }
        }
      ]
    }
  ]
})

const store = new Vuex.Store({
  state: {
    visitedView: []
  },
  mutations: {
    addViews: (state, view) => {
      state.visitedView.push(view)
    },
    deleteViews: (state, view) => {
      for (let k in state.visitedView) {
        if (state.visitedView[k].route.path === view.route.path) {
          state.visitedView.splice(k, 1)
          break
        }
      }
    }
  }
})


Vue.use(Repetition, {router})



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
