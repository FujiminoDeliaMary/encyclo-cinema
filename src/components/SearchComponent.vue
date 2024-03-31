<script setup>
import { ref, watch } from 'vue'
import api from '../services/api.service'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash-es'

const search = ref()
const searchResults = ref([])
const router = useRouter()
const createFilmSlug = (filmName) => {
  return filmName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const goToFilmDetails = (filmId, filmName) => {
  const path = `/${createFilmSlug(filmName)}/${filmId}`
  if (window.location.pathname === path) {
    window.location.reload()
  } else {
    router.push({ path })
  }
}

const handleSearch = async () => {
  if (search.value !== '') {
    try {
      const results = await api.getFilmByName(search.value)
      searchResults.value = results
      console.log(results)
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
    }
  } else {
    searchResults.value = []
  }
}

// Fonction qui attend que l'utilisateur ait fini de taper pendant un délai spécifique avant de chercher
const debouncedSearch = debounce(async () => {
  handleSearch()
}, 500)

watch(search, debouncedSearch)
</script>

<template>
  <section class="search">
    <form method="get" action="index.php" @submit.prevent="handleSearch">
      <input
        type="text"
        class="barreRecherche"
        placeholder="Entrez votre recherche"
        v-model="search"
        @input="debouncedSearch"
      />
    </form>
    <ul class="search__results" v-if="searchResults">
      <li
        v-for="result in searchResults"
        :key="result.id"
        class="item"
        @click="goToFilmDetails(result.id, result.original_title)"
      >
        <p>{{ result.original_title }} - {{ result.release_date.slice(0, 4) }}</p>
      </li>
    </ul>
    <!-- <ul v-if="searchResults.length === 0 && search">
        Aucun film trouvé pour cette entrée
      </ul> -->
  </section>
</template>
