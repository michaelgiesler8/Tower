<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <LoadingComponent />
  </main>
  <footer class="bg-dark text-light text-center p-4">
    Made with 💖 by Michael
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState.js'
import Navbar from './components/Navbar.vue'
import LoadingComponent from './components/LoadingComponent.vue'


export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, LoadingComponent }
}
</script>


<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
