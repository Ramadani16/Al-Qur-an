<template>
  <div class="container">
    <!-- Header Surah -->
    <header class="surah-header">
      <h2 v-if="surahName"> {{ surahName }}</h2>
      <p v-else>Loading surah...</p>
      <p v-if="ayats.length" class="ayat-count">Jumlah Ayat: {{ ayats.length }}</p>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="loading">Loading ayat...</div>

    <!-- Ayat List -->
    <div v-else class="ayat-list">
      <div v-for="(ayat, index) in ayats" :key="index" class="ayat-card">
        <div class="ayat-header">
          <div class="arabic">{{ ayat.arabic_text }}</div>
          <div class="ayat-number">{{ index + 1 }}</div>
        </div>
        <p class="translation">{{ ayat.translation }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const ayats = ref([])
const surahName = ref('')
const loading = ref(true)

// Daftar nama surah sementara
const surahList = [
  { id: 1, name: "Al-Fatihah" },
  { id: 2, name: "Al-Baqarah" },
  { id: 3, name: "Al-Imran" },
  { id: 4, name: "An-Nisa" },
  { id: 5, name: "Al-Ma'idah" },
  { id: 6, name: "Al-An'am" },
    { id: 7, name: "Al-A'araf" },
      { id: 8, name: "Al-Anfal" },
        { id: 9, name: "At-Taubah" },
          { id: 10, name: "Yunus" },
            { id: 11, name: "Hud" },
              { id: 12, name: "Yusuf" },
                { id: 13, name: "Ar-Ra'd" },
                  { id: 14, name: "Ibrahim" },
                    { id: 15, name: "Al-Hijr" },
                      { id: 16, name: "An-Nahl" },
                        { id: 17, name: "Al-Isra'" },
                          { id: 18, name: "Al-Kahf" },
                            { id: 19, name: "Maryam" },
                              { id: 20, name: "Taha" },
                                { id: 21, name: "Al-Anbiya" },
                                  { id: 22, name: "Al-Hajj" },
                                    { id: 23, name: "Al-Mu'minun" },
                                      { id: 24, name: "An-Nur" },
                                        { id: 25, name: "Al-Furqan" },
                                          { id: 26, name: "Asy-Syu'ara'" },
                                            { id: 27, name: "An-Naml" },
                                              { id: 28, name: "Al-Qasas" },
                                                { id: 29, name: "Al-'Ankabut" },
                                                  { id: 30, name: "Ar-Rum" },
                                                    { id: 31, name: "Luqman" },
                                                      { id: 32, name: "As-Sajadah" },
                                                        { id: 33, name: "Al-Ahzab" },
                                                          { id: 34, name: "Saba'" },
                                                            { id: 35, name: "Fatir" },
                                                              { id: 36, name: "Yasin" },
                                                                { id: 37, name: "As-Saffat" },
                                                                  { id: 38, name: "Sad" },
                                                                    { id: 39, name: "Az-Zumar" },
                                                                      { id: 40, name: "Gafir" },
                                                                        { id: 41, name: "Fussilat" },
                                                                          { id: 42, name: "Asy-Syura" },
                                                                            { id: 43, name: "Az-Zukhruf" },
                                                                              { id: 44, name: "Ad-Dukhan" },
                                                                                { id: 45, name: "Al-Jasiyah" },
                                                                                  { id: 46, name: "Al-Ahqaf" },
                                                                                    { id: 47, name: "Muhammad" },
                                                                                      { id: 48, name: "Al-Fath" },
                                                                                        { id: 49, name: "Al-Hujurat" },
                                                                                          { id: 50, name: "Qaf" },
                                                                                            { id: 51, name: "Az-Zariyat" },
                                                                                              { id: 52, name: "At-Tur" },
                                                                                                { id: 53, name: "An-Najm" },
                                                                                                  { id: 54, name: "Al-Qamar" },
                                                                                                    { id: 55, name: "Ar-Rahman" },
                                                                                                      { id: 56, name: "Al-Waqi'ah" },
                                                                                                        { id: 57, name: "Al-Hadid" },
                                                                                                          { id: 58, name: "Al-Mujadalah" },
                                                                                                            { id: 59, name: "Al-Hasyr" },
                                                                                                              { id: 60, name: "Al-Mumtahanah" },






















































]

onMounted(async () => {
  const surahId = Number(route.params.id)

  try {
    const res = await axios.get(`http://localhost:3000/api/surah/${surahId}`)
    ayats.value = res.data

    const currentSurah = surahList.find(s => s.id === surahId)
    surahName.value = currentSurah?.name || `Surah ID ${surahId}`
  } catch (err) {
    console.error("Gagal fetch ayat:", err)
    ayats.value = []
    const currentSurah = surahList.find(s => s.id === surahId)
    surahName.value = currentSurah?.name || `Surah ID ${surahId}`
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Poppins:wght@400;600&display=swap');

.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

.surah-header {
  text-align: center;
  margin-bottom: 20px;
}

.surah-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #047857;
}

.ayat-count {
  color: #065f46;
  font-weight: 500;
  margin-top: 5px;
}

.loading {
  text-align: center;
  font-weight: 600;
  color: #065f46;
}

.ayat-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ayat-card {
  background: #f9fafb;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #d1fae5;
  transition: all 0.3s ease;
}

.ayat-card:hover {
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.ayat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 15px; /* jarak antara Arab dan nomor ayat */
}

.arabic {
  font-family: 'Amiri', serif;
  font-size: 22px;
  text-align: right;
  color: #065f46;
  flex: 1;
  padding-right: 10px; /* jarak ke sisi kanan card */
}

.ayat-number {
  background: #d1fae5;
  color: #059669;
  font-weight: bold;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.translation {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
}
</style>
