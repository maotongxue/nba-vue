import Vue from 'vue'
import Router from 'vue-router'

import nba from '@/components/nba'
import nbaStatus from '@/components/nbaStatus'

Vue.use(Router)

export default new Router({
  mode: 'history', //去掉url里的#
  routes: [
    {
      path: '/',
      name: 'nba',
      component: nba
    },
    {
      path: '/nbaStatus',
      name: 'nbaStatus',
      component: nbaStatus
    }
  ]
})
