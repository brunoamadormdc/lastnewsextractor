import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/hm',
    name: 'Home',
    component: () => import('../views/Home/Home.vue')
  },

  {
    path: '/',
    name: 'Last News',
    component: () => import('../views/Main/Main.vue'),
    children: [
     
      {
        path: '/main/links',
        name: 'Links',
        component: () => import('../views/Main/Links/Links.vue')
      },

      {
        path: '/main/linkshistory',
        name: 'Histórico de Links',
        component: () => import('../views/Main/LinksHistory/LinksHistory.vue')
      },
      
      
      {
        path: '/main/profile',
        name: 'Profile',
        component: () => import('../views/Main/Profile/Profile.vue')
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes

})

export default router
