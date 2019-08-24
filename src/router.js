import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn.vue'
import Products from './views/Products.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',

  routes: [{
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
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('./views/admin/AdminProducts.vue')
    },
    {
      path: '/admin/products/new',
      name: 'admin-products-new',
      component: () => import('./views/admin/AdminProductNew.vue')
    },
    {
      path: '/admin/products/:productId',
      name: 'admin-product',
      component: () => import('./views/admin/AdminProduct.vue')
    },
    {
      path: '/admin/products/:productId/edit',
      name: 'admin-product-edit',
      component: () => import('./views/admin/AdminProductEdit.vue')
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('./views/admin/AdminOrders.vue')
    },
    {
      path: '/admin/orders/:orderId',
      name: 'admin-order',
      component: () => import('./views/admin/AdminOrder.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    }
  ]
})