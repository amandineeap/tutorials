<template>
  <div>
    <p v-if="$fetchState.pending">Fetching planets...</p>
    <p v-else-if="$fetchState.error">Error loading planets.</p>
    <ul>
      <li v-for="planet in planets" :key="planet.slug">
        <NuxtLink :to="planet.slug">{{ planet.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // async asyncData is called before the page is loaded & only on page components
  // async fetch gets called after the page is loaded
  async fetch() {
    this.planets = await fetch('https://api.nuxtjs.dev/planets').then((res) => {
      return res.json()
    })
  },
  data() {
    return { planets: [] }
  },
}
</script>
