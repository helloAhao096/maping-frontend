<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

import { ref } from 'vue'
import { Check, ChevronsUpDown, Plus } from 'lucide-vue-next'
import { watchDebounced } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {cn} from "@/lib/utils.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {inputtips, poiDetail} from "@/api/map/map.ts";
import {useMapStore} from "@/store/map.ts";
import {length} from "axios";


const open = ref(false)
// const value = ref('')
const mapStore = useMapStore()

const searchInput = ref("")
const tips = ref([])

watchDebounced(
    searchInput,
    (debouncedValue) => {
      locationInputTip(debouncedValue)

      // console.log(value)
      // console.log(searchInput.value)
    },
    { debounce: 1000, maxWait: 2000 },
)


function locationInputTip(keywords){
  const params = {
    keywords: keywords,
    location: mapStore.LngLat,
    key: import.meta.env.VITE_AMAP_WEB_KEY
  }

  inputtips(params)
      .then(response => {
        if (response.status == 1 ) {
          const filterTips = response.tips.filter(tip => tip.id.length !== 0)
          tips.value = filterTips
          console.log(filterTips)
        }
      })
}

function searchLocation(id: string) {
  const params = {
    id: id,
    key: import.meta.env.VITE_AMAP_WEB_KEY
  }
  poiDetail(params).then(response => {
    console.log(response)
    if (response.status == 1 ) {
      console.log(response)
      console.log(response.pois)
      // const filterTips = response.tips.filter(tip => tip.id.length !== 0)
      // tips.value = filterTips
      // console.log(filterTips)
      const poi = response.pois[0]
      console.log(poi.location)
      mapStore.targetLngLat = poi.location

      mapStore.setZC(15, mapStore.splitTargetLngLat.lng, mapStore.splitTargetLngLat.lat)
      mapStore.addTargetMarker(mapStore.splitTargetLngLat.lng, mapStore.splitTargetLngLat.lat)
    }
  })
}

</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger
                    :class="cn(
                  'fixed left-1/3 top-[5%] z-10',
                )">
<!--      <div class="max-w-sm items-center">-->
<!--        <Input id="search" type="text" placeholder="Search..." class=" pl-10" />-->
<!--        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">-->
<!--          <Search class="size-6 text-muted-foreground" />-->
<!--        </span>-->
<!--      </div>-->
      <div>
        <div class="relative max-w-sm items-center w-[400px]">
          <Input id="search" type="text" placeholder="Search..." class="pl-10"
          v-model="searchInput"/>
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
      </div>

    </PopoverTrigger>

    <PopoverContent class="w-[380px]">
      <Command>
        <CommandEmpty>未找到建议。</CommandEmpty>
        <CommandList class="pr-4">
          <CommandGroup>

            <div class="flex h-full whitespace-nowrap overflow-hidden overflow-ellipsis space-x-2.5"
                v-for="tip in tips">
              <CommandItem class="w-10/12 overflow-hidden overflow-ellipsis flex-col items-start"
                           :key="tip.id"
                           :value="tip.id"
                           v-on:click="searchLocation(tip.id)">
                <span class=""> {{ tip.name }} </span>
                <span class="text-gray-400 overflow-hidden overflow-ellipsis">{{ tip.district }}</span>
              </CommandItem>

              <Button class="w-2/12" variant="ghost" size="full" @click="">
                <Plus
                    class=""
                />
              </Button>
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

</template>

<style scoped>

</style>