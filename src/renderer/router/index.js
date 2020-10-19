import Vue from 'vue'
import Router from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
      path: '/databses-manage',
      name: 'databses-manage',
      component: require('@/components/Pages/DatabsesManage').default
    },
    {
      path: '/container-manage',
      name: 'container-manage',
      component: require('@/components/Pages/ContainerManage').default
    },
    {
      path: '/images-manage',
      name: 'images-manage',
      component: require('@/components/Pages/ImagesManage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
