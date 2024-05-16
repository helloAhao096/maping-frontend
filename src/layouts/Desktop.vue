<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

import MapContainer from '@/components/amap/AMapContainer.vue';

import GuideList from "@/components/guide/GuideList.vue";
import CommandSearch from "@/components/commandSearch/CommandSearch.vue";
import {Search} from "lucide-vue-next";
import {Input} from "@/components/ui/input";
import Navigate from "@/components/bar/NavationBar.vue";


</script>

<template>

  <!--  <Desktop>-->
  <!--    <template #left>-->

  <!--    </template>-->
  <!--    <template #right>-->
  <!---->
  <!--    </template>-->
  <!--  </Desktop>-->

  <div class="h-screen p-4">

    <ResizablePanelGroup direction="horizontal" class="w-full rounded-lg border">
      <!--左边面板-->
      <ResizablePanel :default-size="30" class="p-2 flex flex-col h-full space-y-2">
        <slot name="panel">

        </slot>
      </ResizablePanel>

      <!--      分割线-->
      <ResizableHandle disabled/>

      <ResizablePanel>
        <slot name="map"></slot>
        <!--        <MapContainer></MapContainer>-->
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>

</template>

<style scoped lang="sass">

</style>