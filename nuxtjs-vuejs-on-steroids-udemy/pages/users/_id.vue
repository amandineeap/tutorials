<template>
  <div>
    <h1>user's data, with ID: {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  // executed before rendering the route
  validate(data) {
    return /^\d+$/.test(data.params.id); // checks id is a number
  }
};
</script>
