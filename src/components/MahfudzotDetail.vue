<template>
  <div v-if="mahfudzot" class="p-4 border rounded shadow-md max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-2">Detail Mahfudzot</h2>
    <p><strong>Arabic:</strong> {{ mahfudzot.arabic }}</p>
    <p><strong>Latin:</strong> {{ mahfudzot.latin }}</p>
    <p><strong>Arti:</strong> {{ mahfudzot.arti }}</p>
    <p><strong>Kelas:</strong> {{ mahfudzot.kelas }}</p>
    <button @click="goBack" class="mt-4 text-red-600 hover:underline">← Kembali</button>
  </div>
  <p v-else class="text-center mt-4">Loading Mahfudzot...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const mahfudzot = ref(null);

const fetchMahfudzotDetail = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/mahfudzot/${id}`);
    mahfudzot.value = res.data;
  } catch (err) {
    console.error('Fetch gagal:', err);
  }
};

const goBack = () => {
  router.push({ name: 'MahfudzotList' });
};

onMounted(() => {
  fetchMahfudzotDetail(route.params.id);
});
</script>
