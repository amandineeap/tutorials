<template>
  <div>
    <h1>nuxt-mission-netlify</h1>
    <!--   // For lazy loading (which will not generate the dynamic pages)
      <button @click="showPlanets">Show planets</button>
    <div v-if="show">
      <LazyPlanetsList />
    </div> -->
    <PlanetsList />
  </div>
</template>

<script>
export default {
  layout: 'home',
  // For lazy loading (which will not generate the dynamic pages)
  // data() {
  //   return {
  //     show: false,
  //   }
  // },
  // methods: {
  //   showPlanets() {
  //     this.show = true
  //   },
  // },
}
</script>
