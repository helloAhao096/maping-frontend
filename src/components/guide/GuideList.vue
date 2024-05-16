<script setup lang="ts">

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, Delete, Plus } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

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


defineProps<{
  payment: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>

<!--  <ScrollArea  class="h-full rounded-md border p-4">-->
<!--    &lt;!&ndash;                <ScrollArea class="w-[150px] flex-[7] rounded-md border p-4">&ndash;&gt;-->

<!--  </ScrollArea>-->

<!-- ⚠️ 暂时废弃-->

  <Table>

    <TableHeader>
      <TableRow>
        <TableHead class="sticky top-0 bg-white">
          我的指南
        </TableHead >
        <TableHead class="sticky top-0 bg-white">

        </TableHead >

        <TableHead class="sticky top-0 bg-white">
          <Button variant="outline" size="icon">
            <Plus class="w-5 h-5"/>
          </Button>
        </TableHead >

      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="invoice in invoices" :key="invoice.invoice"
      class="cursor-pointer"
      @click="">

        <TableCell >
          <Avatar>
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </TableCell>

        <TableCell class="font-medium flex flex-col">
          <span>苏州</span>
          <span class="text-gray-400">21 个地点</span>
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
              <DropdownMenuItem @click="copy(payment.id)">
                重命名
              </DropdownMenuItem>
              <DropdownMenuItem @click="copy(payment.id)">
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

</template>

<style scoped>


</style>