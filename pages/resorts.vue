<template>
  <div>
    <NuxtChild />
  </div>
</template>

<script lang="ts">
export default {
  scrollToTop: true,
  middleware({ route, redirect }) {
    const isBaseRoute = route.matched.length === 1;
    if (isBaseRoute) {
      redirect("/resorts/solitude");
    }
  },
};
</script>
