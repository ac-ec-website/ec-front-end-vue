import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn.vue'
import Products from './views/Products.vue'
// import store from './store'
Vue.use(Router)
// const checkIsAdmin = (to, from, next) => {
//   const currentUser = store.state.currentUser
//   if (currentUser.role !== 'admin') {
//     next('/404')
//     return
//   }
//   next()
// }

const router = new Router({
  linkExactActiveClass: 'active',

  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/products'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/order/create',
      name: 'orderCreate',
      component: () => import('./views/OrderCreate.vue')
    },
    {
      path: '/order',
      name: 'orderDetail',
      component: () => import('./views/OrderDetail.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('./views/Payment.vue')
    },
    {
      path: '/products/:productId',
      name: 'product',
      component: () => import('./views/Product.vue')
    },
    {
      path: '/admin',
      exact: true,
      redirect: '/admin/products'
    },
    {
      path: '/admin/signup',
      name: 'admin-signup',
      component: () => import('./views/admin/AdminSignUp.vue')
    },
    {
      path: '/admin/signin',
      name: 'admin-signin',
      component: () => import('./views/admin/AdminSignIn.vue')
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('./views/admin/AdminProducts.vue')
      // beforeEnter: checkIsAdmin
    },
    {
      path: '/admin/products/new',
      name: 'admin-products-new',
      component: () => import('./views/admin/AdminProductNew.vue')
      // beforeEnter: checkIsAdmin
    },
    {
      path: '/admin/products/:productId',
      name: 'admin-product',
      component: () => import('./views/admin/AdminProduct.vue')
      // beforeEnter: checkIsAdmin
    },
    {
      path: '/admin/products/:productId/edit',
      name: 'admin-product-edit',
      component: () => import('./views/admin/AdminProductEdit.vue')
      // beforeEnter: checkIsAdmin
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('./views/admin/AdminOrders.vue')
      // beforeEnter: checkIsAdmin
    },
    {
      path: '/admin/orders/:orderId',
      name: 'admin-order',
      component: () => import('./views/admin/AdminOrder.vue')
      // beforeEnter: checkIsAdmin
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path.indexOf('admin') < 0) {
//     next()
//     return
//   }

//   console.log('store.state.token:', store.state.token.slice(0, 10))
//   if (!store.state.token) {
//     store.dispatch('fetchCurrentUser')
//   }
//   next()
// })

export default router
