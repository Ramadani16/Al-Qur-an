import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import SurahDetail from '../components/SurahDetail.vue';
import MahfudzotDetail from '../components/MahfudzotDetail.vue';
import MahfudzotList from '../components/MahfudzotList.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/surah/:id', name: 'SurahDetail', component: SurahDetail, props: true },
    {
    path: '/mahfudzot',
    name: 'MahfudzotList',
    component: MahfudzotList
  },
  { path: '/mahfudzot/:id', name: 'MahfudzotDetail', component: MahfudzotDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
