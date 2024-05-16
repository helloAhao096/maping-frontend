<script setup lang="ts">
import {ArrowLeft, X} from 'lucide-vue-next';
import {Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import { Plus, Settings2,Info } from 'lucide-vue-next';
import {Button} from "@/components/ui/button";

</script>

<template>

  <Menubar class="flex justify-around h-[68px]">

    <MenubarMenu>
      <Button class="h-14 w-14 hover:bg-gray-300" variant="ghost" size="icon" @click="">
        <Settings2 class="h-8 w-8" />
      </Button>
    </MenubarMenu>

    <MenubarMenu>
          <Button class="h-14 w-14 hover:bg-gray-300" variant="ghost" size="icon" @click="">
            <Plus class="h-8 w-8" />
          </Button>
    </MenubarMenu>

  </Menubar>

</template>

<style scoped>

</style>