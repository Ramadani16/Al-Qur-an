<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">📖 Daftar Mahfudzot</h1>

    <p v-if="loading">Loading Mahfudzot...</p>

    <ul v-if="!loading">
      <li v-for="m in mahfudzots" :key="m.id" class="mb-2">
        <button @click="goToDetail(m.id)" class="text-blue-600 hover:underline">
          {{ m.arabic }} - {{ m.latin }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const mahfudzots = ref([]);
const loading = ref(false);
const router = useRouter();

const fetchMahfudzots = async () => {
  loading.value = true;
  try {
    const res = await axios.get('http://localhost:3000/api/mahfudzot');
    mahfudzots.value = res.data;
  } catch (err) {
    console.error('Fetch gagal:', err);
  } finally {
    loading.value = false;
  }
};

const goToDetail = (id) => {
  router.push({ name: 'MahfudzotDetail', params: { id } });
};

onMounted(fetchMahfudzots);
</script>
