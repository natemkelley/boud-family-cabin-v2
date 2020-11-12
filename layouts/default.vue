<template>
  <div class="default">
    <NuxtLink to="/">Index page</NuxtLink>
    <NuxtLink to="/test">Test page</NuxtLink>
    <NuxtLink to="/about">about page</NuxtLink>

    <Nuxt class="container" />
  </div>
</template>

<script>
export default {
  transition: "slide-left",
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
