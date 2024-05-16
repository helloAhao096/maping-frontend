<script setup lang="ts">
import AMapContainer from "@/components/amap/AMapContainer.vue";
import GuideList from "@/components/guide/GuideList.vue";
import Navigate from "@/components/bar/NavationBar.vue";
import Desktop from "@/layouts/Desktop.vue";
import CommandSearch from "@/components/commandSearch/CommandSearch.vue";
</script>

<template>

  <Desktop>

    <template #panel>
      <!--        table-->
        <router-view></router-view>
    </template>

    <template #map>
      <CommandSearch></CommandSearch>
      <AMapContainer></AMapContainer>
    </template>
  </Desktop>

</template>

<style scoped>

</style>
