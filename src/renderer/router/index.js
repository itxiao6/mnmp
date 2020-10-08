import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/site-manage',
      name: 'site-manage',
      component: require('@/components/Pages/SiteManage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
