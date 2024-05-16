<script setup lang="ts">
import {ArrowUpDown, Info, X, Delete, MoreHorizontal, SquareArrowOutUpRight} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useRouter} from "vue-router";
import TravelDetailBar from "@/components/bar/TravelDetailBar.vue";

export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

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

function closeGuide() {
  router.back()
}
</script>

<template>

  <div class="w-full h-[10%] flex px-4 justify-between py-1">
    <div>
      <Avatar  size="base" shape="square">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>


    <div class="flex flex-col w-3/6">
      <span class="text-5xl"> {{"苏州"}} </span>
      <span class="text-gray-400">21 个地点</span>
    </div>

    <div class="flex flex-col space-y-1" >
      <Button class="bg-gray-300 hover:bg-gray-400" variant="ghost" size="icon" @click="">
        <SquareArrowOutUpRight />
      </Button>

      <Button class="bg-gray-300 hover:bg-gray-400" variant="ghost" size="icon" @click="closeGuide">
        <X class="w-5 h-5"/>
      </Button>
    </div>


  </div>
  <hr/>

    <Table>
      <TableBody>
        <TableRow v-for="invoice in invoices" :key="invoice.invoice"
                  class="cursor-pointer flex items-center"
                  @click="">

          <TableCell class="w-4/6 font-medium flex flex-col">
            <span class="text-2xl">苏州</span>
          </TableCell>

          <TableCell class="w-1/6">
            <Avatar shape="square">
              <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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

  <TravelDetailBar></TravelDetailBar>
</template>