const api = {
  //     const url = 'https://api.themoviedb.org/3'

  // const APIKEY = 'api_key=908cc7cc4055f869e2c682ba738e2f98'

  // const API_URL = url + '/discover/movie?sort_by=popularity_desc&primary_release_year&' + APIKEY

  // const genres = 'https://api.themoviedb.org/3/genre/movie/list?language=fr&' + APIKEY

  // const IMG_LINK = 'https://image.tmdb.org/t/p/w500/'

  // const id = 15691

  // const search = 'https://api.themoviedb.org/3/movie/' + id + '?language=fr-FR&' + APIKEY

  // const credits = 'https://api.themoviedb.org/3/movie/' + id + '/credits?' + APIKEY

  // const images = 'https://api.themoviedb.org/3/movie/' + id + '/images?' + APIKEY

  //   var sixMonthSooner = new Date()
  // sixMonthSooner.setMonth(sixMonthSooner.getMonth() - 6)
  // const sixMonthSoonerFormate = sixMonthSooner.toISOString().split('T')[0]

  // const dernieresSorties =
  //   'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&' +
  //   APIKEY +
  //   '&primary_release_date.gte=' +
  //   sixMonthSoonerFormate
  getLatestReleases: async () => {
    const APIKEY = 'api_key=908cc7cc4055f869e2c682ba738e2f98'
    var sixMonthSooner = new Date()
    sixMonthSooner.setMonth(sixMonthSooner.getMonth() - 6)
    const sixMonthSoonerFormate = sixMonthSooner.toISOString().split('T')[0]

    const dernieresSorties =
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&' +
      APIKEY +
      '&primary_release_date.gte=' +
      sixMonthSoonerFormate

    try {
      return await fetch(dernieresSorties)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur détectée')
          }
          return response.json()
        })
        .then((data) => {
          console.log(data)
          return data
        })
        .catch((error) => console.error(error))
    } catch (error) {
      throw new Error(error)
    }
  },

  getAllGenres: async () => {
    const APIKEY = 'api_key=908cc7cc4055f869e2c682ba738e2f98'
    const genres = 'https://api.themoviedb.org/3/genre/movie/list?language=fr&' + APIKEY

    try {
      return await fetch(genres)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur détectée')
          }
          return response.json()
        })
        .then((data) => {
          return data
        })
        .catch((error) => console.log(error))
    } catch (error) {
      throw new Error(error)
    }
  },

  getPersons: async (data, role) => {
    return data
      .filter((person) => {
        return person.known_for_department === role
      })
      .map((person) => person.name)
      .join(', ')
  },

  getDetails: async (id) => {
    const APIKEY = 'api_key=908cc7cc4055f869e2c682ba738e2f98'
    const URL = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR&${APIKEY}`

    try {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error('Erreur détectée')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  getCredits: async (id) => {
    const APIKEY = 'api_key=908cc7cc4055f869e2c682ba738e2f98'
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?${APIKEY}`
    try {
      const response = await fetch(creditsUrl)
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des crédits')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  },

  getPhotos: async (id) => {
    const APIKEY = 'api_key=908cc7cc4055f869e2c682ba738e2f98'
    const photos = `https://api.themoviedb.org/3/movie/${id}/images?${APIKEY}`

    try {
      const response = await fetch(photos)
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des photos')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }
}

// liste des personnes ayant participé au film

export default api
