import { createRouter, createWebHashHistory } from 'vue-router';
import AvailabilityView from '../views/AvailabilityView.vue';
import NoPageFoundView from '../views/NoPageFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/ConfirmedView.vue'),

  },
  {
    path: '/confirmed-shifts',
    name: 'confirmed',
    component: () => import('../views/ConfirmedView.vue'),
  },

  {
    path: '/availability-shifts',
    name: 'availability',
    component: AvailabilityView,

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NoPageFoundView,

  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
