<script setup lang="ts">

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, Delete, Plus } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { customAlphabet } from 'nanoid'

import {useRouter} from "vue-router";
import {useTimeout, useTimestamp} from "@vueuse/core";
import {nextTick, onMounted, onUpdated, Ref, ref, watch} from "vue";
import {Input} from "@/components/ui/input";

defineProps<{
}>()

const router = useRouter()

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },{
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },{
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },{
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },{
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },{
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },{
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },{
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]
const guides = ref<GuideInfo[]>([])

const nanoid = customAlphabet('1234567890abcdef', 10)

const guideInputValue = ref("新指南")
const guideInputEle = ref<any>(null)

const guideInputTrigger = ref(false)

onMounted(()=>{
  // guideInputEle.value.setSelectionRange(0, guideInputValue.value.length)
  // console.log(guideInputEle.value)
  // guideInputEle.value.focus()
  // guideInputEle.value.select()
})
onUpdated(() => {
  // nextTick(() => {
  // });
  // console.log(guideInputEle.value)

  // console.log(guideInputValue.value)
})


function selectGuide(index: any) {
  console.log(index)
  router.push({
    name: "guideDetail",
    params: {id: index}
  })
}

function addGuideItem() {
  guideInputTrigger.value = true
  nextTick(() => {
    guideInputEle.value.inputEle.focus()
    guideInputEle.value.inputEle.select()
  });

}
// watch(guideInputTrigger, (nv, ov) => {
//   console.log(nv)
//   if (nv) {
//
//     console.log(guideInputEle.value.inputEle)
//   }
// })

function guideLine(name: string) {
  const guideNanoId = nanoid() //=> "4f90d13a42"
  const nowstamp = useTimestamp()
  const guideInfo: GuideInfo = {
    nanoid: guideNanoId,
    cover: "",
    name: name,
    locations: [],
    time: nowstamp.value
  }
  return guideInfo
}

function inputChange() {
  console.log(guideInputValue.value)
  guideInputTrigger.value = false
  const guideInfo = guideLine(guideInputValue.value)
  guides.value.unshift(guideInfo)
  guideInputValue.value = "新指南"
}

</script>

<template>
  <div class="flex-1 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="sticky top-0 bg-white w-3/12">
              我的指南
            </TableHead >
            <TableHead class="sticky top-0 bg-white w-full">

            </TableHead >

            <TableHead class="sticky top-0 bg-white w-1/12">
              <Button class="" variant="outline" size="sm" @click="addGuideItem">
                <Plus class="w-5 h-5"/>
              </Button>
            </TableHead >

          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow class="w-full" v-show="guideInputTrigger">
            <TableCell>
              <Avatar shape="square">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>GD</AvatarFallback>
              </Avatar>
            </TableCell>

            <TableCell class="font-medium flex flex-col space-y-2">
              <Input ref="guideInputEle" v-model="guideInputValue" class="h-10 text-lg"
                     @blur="inputChange" @keydown.enter="$event.target.blur()"/>
              <span class="text-gray-400">0个地点</span>
            </TableCell>

            <TableCell>

              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="w-8 h-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="">
                    重命名
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="">
                    修改封面
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem class="bg-red-600 text-white flex justify-between focus:bg-red-700 focus:text-white">
                    <span>删除</span>
                    <Delete class="w-4 h-4"/>
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>

            </TableCell>
          </TableRow>

<!--          <TableRow class="w-full">-->
<!--            <TableCell @click="selectGuide(index)">-->
<!--              <Avatar shape="square">-->
<!--                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />-->
<!--                <AvatarFallback>CN</AvatarFallback>-->
<!--              </Avatar>-->
<!--            </TableCell>-->

<!--            <TableCell class="font-medium flex flex-col" @click="selectGuide(index)">-->

<!--              <span>11</span>-->
<!--              <span class="text-gray-400">10个地点</span>-->
<!--            </TableCell>-->

<!--            <TableCell>-->

<!--              <DropdownMenu>-->

<!--                <DropdownMenuTrigger as-child>-->
<!--                  <Button variant="ghost" class="w-8 h-8 p-0">-->
<!--                    <span class="sr-only">Open menu</span>-->
<!--                    <MoreHorizontal class="w-4 h-4" />-->
<!--                  </Button>-->
<!--                </DropdownMenuTrigger>-->

<!--                <DropdownMenuContent align="end">-->
<!--                  <DropdownMenuItem @click="">-->
<!--                    重命名-->
<!--                  </DropdownMenuItem>-->
<!--                  <DropdownMenuItem @click="">-->
<!--                    修改封面-->
<!--                  </DropdownMenuItem>-->
<!--                  <DropdownMenuSeparator />-->

<!--                  <DropdownMenuItem class="bg-red-600 text-white flex justify-between focus:bg-red-700 focus:text-white">-->
<!--                    <span>删除</span>-->
<!--                    <Delete class="w-4 h-4"/>-->
<!--                  </DropdownMenuItem>-->
<!--                </DropdownMenuContent>-->

<!--              </DropdownMenu>-->

<!--            </TableCell>-->
<!--          </TableRow>-->

          <TableRow v-for="(guide, index) in guides" :key="index"
                    class="cursor-pointer">
            <TableCell @click="selectGuide(guide.nanoid)">
              <Avatar shape="square">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>GD</AvatarFallback>
              </Avatar>
            </TableCell>

            <TableCell class="font-medium flex flex-col space-y-2" @click="selectGuide(guide.nanoid)">
              <span class="text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">{{ guide.name }}</span>
              <span class="text-gray-400">{{guide.locations.length}}个地点</span>
            </TableCell>

            <TableCell>

              <DropdownMenu>

                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="w-8 h-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="">
                    重命名
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="">
                    修改封面
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem class="bg-red-600 text-white flex justify-between focus:bg-red-700 focus:text-white">
                    <span>删除</span>
                    <Delete class="w-4 h-4"/>
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>

            </TableCell>

          </TableRow>
        </TableBody>
      </Table>
  </div>
</template>

<style scoped>


</style>