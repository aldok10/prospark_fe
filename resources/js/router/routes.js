function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'welcome', component: page('welcome.vue') },

  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },

  { path: '/home', name: 'home', component: page('home.vue') },
  { path: '/settings',
    component: page('settings/index.vue'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: page('settings/profile.vue') },
      { path: 'password', name: 'settings.password', component: page('settings/password.vue') }
    ],
  },

  { path: '/products', name: 'products.index', component: page('products/index.vue')},
  { path: '/products/add', name: 'products.add', component: page('products/add.vue') },
  { path: '/products/edit/:id', name: 'products.edit', component: page('products/edit.vue') },

  { path: '*', component: page('errors/404.vue') }
]
