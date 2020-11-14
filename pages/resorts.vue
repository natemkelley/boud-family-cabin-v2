<template>
  <div></div>
</template>

<script lang="ts">
export default {
  middleware({ route, redirect }) {
    const isBaseRoute = route.matched.length === 1;
    if (isBaseRoute) {
      redirect("/resorts/brighton");
    }
  },
};
</script>
