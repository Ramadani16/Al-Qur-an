<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const surahs = ref([]);
const selectedSurah = ref(null);
const loading = ref(false);

const fetchSurahs = async () => {
  loading.value = true;
  const res = await axios.get("http://localhost:3000/api/surahs");
  surahs.value = res.data;
  loading.value = false;
};

const fetchSurahDetail = async (id) => {
  loading.value = true;
  const res = await axios.get(`http://localhost:3000/api/surah/${id}`);
  selectedSurah.value = res.data;
  loading.value = false;
};

onMounted(fetchSurahs);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📖 Daftar Surah</h1>

    <!-- List -->
    <ul v-if="!selectedSurah">
      <li v-for="s in surahs" :key="s.id" class="mb-2">
        <button @click="fetchSurahDetail(s.id)" class="text-blue-600 hover:underline">
          {{ s.number }}. {{ s.name }} ({{ s.arabic_name }})
        </button>
      </li>
    </ul>

    <!-- Detail -->
    <div v-else>
      <h2 class="text-xl font-semibold mb-4">
        {{ selectedSurah.name }} ({{ selectedSurah.arabic_name }})
      </h2>
      <p v-for="(ayat, idx) in selectedSurah.text" :key="idx" class="mb-2">
        <span class="font-bold">{{ idx }}.</span> {{ ayat }}
      </p>
      <button @click="selectedSurah = null" class="mt-4 text-red-600 hover:underline">← Kembali</button>
    </div>
  </div>
</template>
