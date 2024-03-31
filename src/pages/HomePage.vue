<script setup>
import { onMounted, ref } from 'vue'
import api from '../services/api.service'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import Search from '../components/SearchComponent.vue'
SwiperCore.use([Navigation, Pagination, Autoplay])

onMounted(async () => {
  try {
    const data = await api.getLatestReleases()
    const dataGenres = await api.getAllGenres()
    console.log(dataGenres.genres)
    latestReleases.value = data.results
    genres.value = dataGenres.genres
  } catch (error) {
    console.error('Erreur lors du chargement des nouvelles sorties', error)
  }
})

const IMG_LINK = 'https://image.tmdb.org/t/p/w500/'

const createFilmSlug = (filmName) => {
  return filmName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const latestReleases = ref([])
const genres = ref([])
</script>

<template>
  <main>
    <Search />

    <section class="presentation">
      <div class="presentation__overlay"></div>

      <h1>Bienvenue,</h1>
      <p>
        Notre site est votre destination ultime pour découvrir les derniers films, explorer une
        vaste gamme de genres, et trouver les informations les plus complètes sur vos films
        préférés. Plongez dans l'univers cinématographique avec des critiques, des notes, et des
        recommandations personnalisées. Notre carrousel vous offre une expérience immersive pour
        découvrir les films les mieux notés et les plus récents. Explorez la diversité de notre
        collection, des classiques intemporels aux dernières sorties. Chaque film a sa propre page
        détaillée, vous permettant de plonger plus profondément dans l'histoire, le casting, et bien
        plus encore
      </p>
    </section>

    <!-- Votre code existant pour les sections search, connexion, et presentation -->

    <section class="sorties">
      <h2 class="sorties__title">Sorties du moment</h2>
      <swiper
        :slides-per-view="5"
        class="swiper"
        navigation
        :scrollbar="{ draggable: true }"
        :centeredSlides="false"
        :breakpoints="{
          100: {
            slidesPerView: 2, // Pour les écrans d'au moins 640px
            spaceBetween: 10
          },
          340: {
            slidesPerView: 3, // Pour les écrans d'au moins 640px
            spaceBetween: 10
          },
          640: {
            slidesPerView: 3, // Pour les écrans d'au moins 640px
            spaceBetween: 20
          },
          768: {
            slidesPerView: 4, // Pour les écrans d'au moins 768px
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 4, // Pour les écrans d'au moins 1024px
            spaceBetween: 40
          },
          1280: {
            slidesPerView: 5, // Pour les écrans d'au moins 1280px
            spaceBetween: 50
          }
        }"
      >
        <SwiperSlide v-for="release in latestReleases" :key="release">
          <div class="swiper-slide card">
            <div class="card__image">
              <img :src="IMG_LINK + release.poster_path" alt="poster" width="200" height="230" />
              <p class="note">
                <i class="fas fa-solid fa-star fa-lg" style="color: #e2e52a"></i>
                {{ Math.floor(release.vote_average, 1) }}&nbsp;/&nbsp;10
              </p>
              <div class="overlay"></div>
              <div class="options">
                <!-- <ul class="options__list">
                  <li class="options__item">
                    <img src="../assets/images/favorite.svg" alt="favoris" class="options__item" />
                  </li>
                  <li class="options__item">
                    <i class="fa-solid fa-star" style="color: #f5f5f5"></i>
                  </li>
                  <li class="options__item">
                    <i class="fa-sharp fa-solid fa-plus" style="color: #f7f7f7"></i>
                  </li>
                  <li class="options__item">
                    <i class="fa-solid fa-thumbs-down" style="color: #fafafa"></i>
                  </li>
                </ul> -->
              </div>
            </div>

            <RouterLink
              :to="{
                name: 'film',
                params: { slug: createFilmSlug(release.title), id: release.id }
              }"
            >
              <h3 class="card__title">{{ release.title }}</h3>
            </RouterLink>
          </div>
        </SwiperSlide>
        ...
      </swiper>
    </section>

    <!-- Votre code pour la section genres -->
    <section class="genres">
      <h2 class="genres__title">Recherche par genre</h2>
      <ul>
        <li v-for="genre in genres" :key="genre">
          <RouterLink to="/">
            {{ genre.name }}
          </RouterLink>
        </li>
      </ul>
    </section>
    <br /><br /><br />
  </main>
</template>

<style>
/* Assurez-vous d'inclure les styles nécessaires pour Swiper ici */
</style>
