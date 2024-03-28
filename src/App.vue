<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
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

    <button class="header__signIn" aria-label="Se Connecter">
      <i class="fa-solid fa-user" style="color: #f1f2f3"></i> Se connecter
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

  <RouterView></RouterView>
</template>
