<template>
  <div>
    <h1>Product, with ID: {{ $route.params.id }}</h1>
    <NuxtLink to="/products">products</NuxtLink>

    <NuxtLink to="/">home</NuxtLink>
  </div>
</template>
