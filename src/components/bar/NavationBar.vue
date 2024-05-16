<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {onBeforeRouteUpdate, useRoute} from 'vue-router'
import {watch} from "vue";

const router = useRoute()
console.log(router)
console.log(router.name)
console.log(router.fullPath)
console.log(router.path)

// watch(() => router.currentRoute.value, (to, from) => {
//   console.log(`路由从 ${from.fullPath} 到 ${to.fullPath}`)
// })

</script>

<template>

  <Menubar class="flex justify-between h-[68px]">
    <MenubarMenu class="w-full">
      <router-link to="/guide" custom v-slot="{ isActive, navigate }">
        <MenubarTrigger class="h-14 w-full flex items-center justify-center" :class="{'bg-accent':isActive}"  @click="navigate">
          主页
        </MenubarTrigger>
      </router-link>
    </MenubarMenu>

    <MenubarMenu>
      <router-link to="/explore" custom v-slot="{ isActive, navigate }">
        <MenubarTrigger  class="h-14 w-full flex items-center justify-center" :class="{'bg-accent':isActive}"  @click="navigate">
          发现
        </MenubarTrigger>
      </router-link>
    </MenubarMenu>

    <MenubarMenu>
      <router-link to="/user" custom v-slot="{ isActive, navigate }">
        <MenubarTrigger class="h-14 w-full flex items-center justify-center" :class="{'bg-accent':isActive}"  @click="navigate">
          我的
        </MenubarTrigger>
      </router-link>
    </MenubarMenu>
  </Menubar>

</template>

<style scoped>

</style>