import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Detail from '@/pages/detail/Detail'
import Category from '@/pages/category/Category'
import List from '@/pages/list/List'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/list/:id/:name',
      name: 'list',
      component: List
    }
  ],
  // 用于切换页面后，保持在顶部
  scrollBehavior (to, from, savePosition) {
    return { x: 0, y: 0 }
  }
})
