<template>
  <div class="app-container">
    <!-- Header -->
    <header class="header">
      <div class="header-icon">
        <i class="fas fa-quran"></i>
      </div>
      <h1 class="app-title">Pemuda Hijrah</h1>
      <p class="app-subtitle">Jelajahi Al-Qur'an dengan desain modern dan pengalaman menyenangkan</p>
    </header>
<!-- Tombol Mahfudzot -->
<div class="button-wrapper">
  <button @click="goToMahfudzot" class="toggle-btn">
    <i class="fas fa-book"></i>
    <span>Mahfudzot</span>
  </button>
</div>

    <!-- Tombol buka/tutup daftar -->
    <div class="button-wrapper">
      <button @click="toggleSurahList" class="toggle-btn">
        <i class="fas" :class="showSurah ? 'fa-times' : 'fa-list'"></i>
        <span>{{ showSurah ? 'Tutup Daftar Surah' : 'Buka Daftar Surah' }}</span>
      </button>
    </div>

    <!-- Grid Surah -->
    <transition name="fade">
      <section v-if="showSurah" class="surah-section">
        <!-- Search -->
        <div class="search-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input v-model="searchQuery" type="text" placeholder="Cari surah..." class="search-input" />
        </div>

        <!-- Grid Cards -->
        <div class="grid-cards">
          <div 
            v-for="surah in filteredSurahs" 
            :key="surah.id" 
            class="card"
            @click="goToSurah(surah.id)"
          >
            <div class="card-number">{{ surah.number }}</div>
            <div class="card-icon"><i class="fas fa-book-open"></i></div>
            <h3 class="card-name">{{ surah.name }}</h3>
<p class="card-english">{{ surah.type }}</p>
<p class="card-arabic">{{ surah.arabic_name }}</p>

          </div>
        </div>
      </section>
    </transition>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 Al-Qur'an Digital - Powered By Ramadani <i class=""></i></p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
const surahs = ref([])
const showSurah = ref(false)
const searchQuery = ref('')
const router = useRouter()

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/surahs')
    surahs.value = res.data
  } catch (err) {
    console.error('Fetch gagal:', err)
    surahs.value = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      name: `Surah ${i + 1}`,
      englishName: `Chapter ${i + 1}`,
      arabicName: 'الفاتحة'
    }))
  }
})

const filteredSurahs = computed(() => {
  if (!searchQuery.value) return surahs.value
  const q = searchQuery.value.toLowerCase()
  return surahs.value.filter(s => 
    s.name.toLowerCase().includes(q) ||
    (s.arabicName && s.arabicName.includes(searchQuery.value)) || 
    s.number.toString().includes(q)
  )
})

function goToMahfudzot() {
  // Jika mau langsung ke daftar, pakai route daftar Mahfudzot
  // router.push('/mahfudzot'); 

  // Contoh ke detail Mahfudzot ID 1
  router.push({ name: 'MahfudzotList', params: { id: 1 } });
}
function toggleSurahList() { showSurah.value = !showSurah.value }
function goToSurah(id) { router.push(`/surah/${id}`) }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Poppins:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.app-container {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #d1fae5, #cffafe, #a5f3fc);
  min-height: 100vh;
  padding: 4rem 2rem 2rem 2rem; /* tambah padding-top jadi 4rem */
}


.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  border-radius: 20px;
  background: linear-gradient(45deg, #10b981, #14b8a6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transition: transform 0.3s;
}
.header-icon:hover { transform: scale(1.1); }

.app-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #047857, #0f766e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1.1rem;
  color: #065f46;
  max-width: 600px;
  margin: 0 auto;
}

.button-wrapper { text-align: center; margin-bottom: 1rem; }

.toggle-btn {
  background: linear-gradient(90deg, #059669, #0f766e);
  color: white;
  padding: 1rem 2rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}
.toggle-btn:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
.toggle-btn:active { transform: scale(0.98); }

.surah-section { margin-bottom: 3rem; }

.search-wrapper {
  position: relative;
  max-width: 400px;
  margin: 0 auto 2rem;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #4b5563;
}
.search-input {
  width: 82%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 20px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s;
}
.search-input:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 1rem;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.card:hover { transform: translateY(-6px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }

.card-number {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #d1fae5;
  color: #059669;
  width: 26px;
  height: 26px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 0.5rem;
  border-radius: 50%;
  background: #10b981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.card:hover .card-icon { background: #0f766e; transform: scale(1.1); }

.card-name { font-weight: 600; color: #065f46; font-size: 0.95rem; margin: 0.25rem 0; }
.card-english { font-size: 0.8rem; color: #6b7280; margin: 0; }
.card-arabic { font-family: 'Amiri', serif; color: #059669; font-size: 1.1rem; margin-top: 0.5rem; }

.footer {
  text-align: center;
  font-size: 0.85rem;
  color: #374151;
}
.heart-icon { color: #ef4444; margin-left: 0.25rem; }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}


</style>
