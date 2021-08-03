<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
    </nav>
    <Nuxt />
  </div>
</template>

<style>
nav {
  margin-bottom: 30px;

  a {
    display: flex;
    flex-direction: row;
  }
}
</style>
