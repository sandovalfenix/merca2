import Vue from 'vue'
import Router from 'vue-router'
//Views 

import Product from '@/views/Product.vue'
import Checkout from '@/views/Checkout.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Invoice from '@/views/Invoice.vue'

import Main from '@/views/Main.vue'

//Components
import Home from '@/components/Home.vue'
import Admin from '@/components/Admin.vue'
import AdminUser from '@/components/AdminUser.vue'
import Section from '@/components/Section.vue'
import formProduct from '@/components/formProduct.vue'
import Sections from '@/components/formSection.vue'
import Products from '@/components/Products.vue'
import ProductsIndex from '@/components/ProductsIndex.vue'
import Users from '@/components/Users.vue'
import Referrals from '@/components/Referrals.vue'
import Orders from '@/components/Orders.vue'
import OrdersList from '@/components/OrdersList.vue'
import OrdersDetails from '@/components/OrdersDetails.vue'

Vue.use(Router)

const routes = [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'section/:id',
          component: Section,
          children: [
            {
              path: 'subSection/:index',
              name: 'sectionSubSection',
              component: Section
            }
          ]
        },
        {
          path: 'product/:id',
          name: 'product',
          component: Product,
        },
      ]
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: { requiresAuth: true },
    },
    {
      path: '/invoice/:id/:num',
      name: 'invoice',
      component: Invoice,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin',
          component: Admin,
        },
        {
          path: 'adminUser',
          name: 'panelUser',
          component: AdminUser,
        },
        {
          path: 'products',
          component: ProductsIndex,
          children: [
            {
              path: '',
              name: 'products',
              component: Products,
            },
            {
              path: 'new',
              name: 'newProduct',
              component: formProduct,
            },
            {
              path: 'edit/:id',
              name: 'editProduct',
              component: formProduct,
            },
          ]
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
        },
        {
          path: 'referrals/:id',
          name: 'referrals',
          component: Referrals,
        },
        {
          path: 'orders',
          component: Orders,
          children: [
            {
              path: '',
              name: 'ordersList',
              component: OrdersList,
            },
            {
              path: 'details/:id/:numInvoice',
              name: 'ordersDetails',
              component: OrdersDetails,
            }
          ]
        },
        {
          path: 'sections',
          component: Sections,
          children: [
            {
              path: '',
              name: 'sectionsIndex',
              component: Sections,
            },
            {
              path: 'new',
              name: 'newSection',
              component: Sections,
            },
            {
              path: 'edita/:id',
              name: 'editSection',
              component: Sections,
            },
          ]
        },
      ]
    }
  ]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
