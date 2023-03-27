
const routes = [
  {
    path: '/desk',
    component: () => import('pages/Index.vue'),
  },
  {
    path: '/mobile',
    component: () => import('pages/IndexM.vue'),
  },
  {
    path: '/manager',
    component: () => import('pages/Manager.vue')
  },
  {
    path: '/products',
    component: () => import('pages/Product.vue')
  },
  {
    path: '/products_mobile',
    component: () => import('pages/ProductM.vue')
  },
  {
    path: '/examples',
    component: () => import('pages/Example.vue')
  },
  {
    path: '/examples_mobile',
    component: () => import('pages/ExampleM.vue')
  },
  {
    path: '/news',
    component: () => import('pages/News.vue')
  },
  {
    path: '/news_mobile',
    component: () => import('pages/NewsM.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
