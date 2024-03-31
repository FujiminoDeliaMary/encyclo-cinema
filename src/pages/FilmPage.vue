<script setup>
import api from '@/services/api.service'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { VuePreloader } from 'vue-preloader'
import SearchComponent from '@/components/SearchComponent.vue'

const detailsMovie = ref()
const creditsMovie = ref()
const directors = ref()
const writers = ref()
const actors = ref()
const images = ref()
const isLoading = ref(true)
const { params } = useRoute()
const IMG_URL = 'https://image.tmdb.org/t/p/w500/'

const getPersons = (data, role) => {
  return data
    .filter((person) => {
      return person.known_for_department === role
    })
    .map((person) => person.name)
    .join(', ')
}

onMounted(async () => {
  try {
    const [details, credits, photos] = await Promise.all([
      api.getDetails(parseInt(params.id, 10)),
      api.getCredits(parseInt(params.id, 10)),
      api.getPhotos(parseInt(params.id, 10))
    ])

    detailsMovie.value = details
    creditsMovie.value = credits
    images.value = photos

    if (creditsMovie.value && creditsMovie.value.crew) {
      directors.value = getPersons(creditsMovie.value.crew, 'Directing')
      writers.value = getPersons(creditsMovie.value.crew, 'Writing')
      actors.value = creditsMovie.value.cast
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données', error)
  } finally {
    isLoading.value = false
  }
})

const listGenres = computed(() => {
  return detailsMovie.value?.genres.map((genre) => genre.name).join(', ') || ''
})

const backdropUrl = computed(() => {
  if (detailsMovie.value && detailsMovie.value.backdrop_path) {
    return `${IMG_URL}${detailsMovie.value.backdrop_path}`
  }
  return '' // Retourne une chaîne vide ou une URL par défaut si `backdrop_path` n'est pas disponible
})
</script>

<template>
  <main>
    <SearchComponent />

    <section class="poster" :style="{ backgroundImage: 'url(' + backdropUrl + ')' }">
      <div class="poster__overlay"></div>

      <p class="poster__note">
        <i class="fa-sharp fa-solid fa-star" style="color: #ffd233"></i>
        {{ Math.floor(detailsMovie?.vote_average) }} / 10
      </p>
      <h1 class="poster__title">{{ detailsMovie?.title }}</h1>
      <p class="poster__genres">
        {{ listGenres }} | PG-13 |{{
          Math.floor(detailsMovie?.runtime / 60) + 'h' + (detailsMovie?.runtime % 60)
        }}
      </p>

      <h2>Synopsis:</h2>
      <p class="poster__synopsis">{{ detailsMovie?.overview }}</p>

      <h2>Dirigé par:</h2>
      <p>{{ directors }}</p>

      <h2>Ecrit par:</h2>
      <p>{{ writers }}</p>

      <!-- <ul class="poster__options">
        <li><font-awesome-icon :icon="['fal', 'heart']" /></li>
        <li><img src="../assets/images/add_white_18dp.svg" alt="" /></li>
        <li><img src="../assets/images/star_rate_white_18dp.svg" alt="" /></li>
        <li><img src="../assets/images/thumb_down_white_18dp.svg" alt="" /></li>
      </ul> -->
    </section>

    <section class="cast">
      <h2 class="cast__title">Top Cast</h2>

      <div class="cast__actors">
        <figure v-for="actor in actors?.slice(0, 10)" :key="actor">
          <img
            :src="IMG_URL + actor.profile_path"
            alt="${name}"
            width="150"
            height="230"
            class="cast__img"
          />
          <figcaption>
            <h3 class="cast__trueName">{{ actor.name }}</h3>
            <p class="cast__actingName">{{ actor.character }}</p>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="photos">
      <h2 class="photos__title">photos | {{ images?.backdrops?.length }}</h2>

      <div class="photos__img">
        <img
          v-for="image in images?.backdrops"
          :key="image"
          :src="IMG_URL + image.file_path"
          class="img"
        />
      </div>
    </section>
  </main>
</template>

<style>
.icon {
  width: 36px;
  height: 36px;
  color: #222;
  margin-left: 12px;
}

body {
  overflow: auto;
}

.pre-loader {
  padding: 10px;
  color: white;
  background-color: #f1f1f1;

  /* Add more styles as needed */
}
</style>
