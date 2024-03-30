<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const handleClick = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.classList.add('blur')
}

const handleChose = () => {
  isOpen.value = false
  document.body.style.overflow = ''
  document.body.classList.remove('blur')
}
</script>

<template>
  <header class="header">
    <h1 class="header__name">
      <i
        class="fa-duotone fa-camera-movie"
        style="--fa-primary-color: #761d1d; --fa-secondary-color: #120205"
      ></i
      >Encyclopédie Cinéma
    </h1>

    <button class="header__signIn" aria-label="Se Connecter" @click="handleClick">
      <i class="fa-solid fa-user" style="color: #f1f2f3"></i> &nbsp;Se connecter
    </button>
  </header>

  <nav class="navbar">
    <ul>
      <li><a href="#">Acceuil</a></li>
      <li><a href="#">Actualités</a></li>
      <li><a href="#">Tendances</a></li>
      <li><a href="#">Concours</a></li>
    </ul>
  </nav>

  <!-- Section de connexion -->
  <section class="connexion" :class="{ open: isOpen }">
    <button class="connexion__close" @click="handleChose">X</button>
    <h2 class="connexion__title">Connexion</h2>

    <form action="" method="post" class="connexion__form">
      <div class="connexion__formgroup">
        <label for="email">Email</label><br />
        <input id="text" type="email" />
      </div>

      <div class="connexion__formgroup">
        <label for="Mot de passe">Mot de passe</label><br />
        <input type="password" />
      </div>

      <button class="connexion__submit" type="submit">Connectez-vous</button>
    </form>

    <a href="#">Mot de passe oublié ?</a>
    <p>Vous n'avez toujours pas de compte ?</p>

    <a href="#">Inscrivez-vous</a>
  </section>

  <RouterView></RouterView>
  <footer class="footer"></footer>
</template>
