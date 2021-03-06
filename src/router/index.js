import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/catalog/:page',
    name: 'Catalog',
    props: true,
    component: () => import('@/views/Catalog.vue'),
  },
  {
    path: '/single/:id',
    name: 'Single',
    props: true,
    component: () => import('@/views/Single.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
