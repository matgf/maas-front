import { createRouter, createWebHashHistory } from 'vue-router';
import AvailabilityView from '../views/AvailabilityView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
