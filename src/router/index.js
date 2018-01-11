import Vue from 'vue'
import Router from 'vue-router'
import store from '~/vuex/store.js'
import Index from '~/page/index'
import Login from '~/page/user/login'
import Register from '~/page/user/register'
import Userexinfo from '~/page/user/userexinfo'
import User_info from '~/page/user/user_info'
import Put_password from '~/page/user/put_password'
import forget_password from '~/page/user/forget_password'
import food_particulars from '~/page/food_particulars'
import myComment from '~/page/user/myComment'
import myReply from '~/page/user/myReply'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      component: Index
    }, {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.isLogin) {
          next('/')
        } else {
          next()
        }
      }
    }, {
      path: '/register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (store.state.isLogin) {
          next('/')
        } else {
          next()
        }
      }
    }, {
      path: '/forget_password',
      component: forget_password
    }, {
      path: '/userexinfo',
      component: Userexinfo,
      children:[
        {
          path: '/', 
          redirect: '/user_info'
        }, {
          path: '/user_info',
          component: User_info
        }, {
          path: '/put_password',
          component: Put_password
        },
         {
          path: '/myComment',
          component: myComment
        },{
          path: '/myReply',
          component: myReply
        },
      ]
    }, {
      path: '/food_particulars/:id',
      component: food_particulars
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});
export default router
