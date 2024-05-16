<script setup lang="ts">
import NavigationBar from "@/components/bar/NavationBar.vue"
</script>

<template>
  <div class="flex-1 overflow-auto">
    <router-view></router-view>
  </div>
  <NavigationBar></NavigationBar>
</template>

<style scoped>

</style>