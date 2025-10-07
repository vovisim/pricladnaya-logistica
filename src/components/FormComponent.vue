<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import type { IItem } from '@/types/IItem.ts'
import { useItemsStore } from '@/stores/useItemsStore.ts'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form'

const itemsStore = useItemsStore();

const submitValues = () => {
  itemsStore.updateItem(editedData.value as Omit<IItem, "amount">);
  editedData.value = JSON.parse(JSON.stringify(itemsStore.item));
}

const formSchema = toTypedSchema(z.object({
  price: z.number().min(1).max(10),
  qty: z.number().min(1),
  amount: z.number(),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <div class="grid gap-5">
    <Form @submit="submitValues" class="flex justify-between items-center gap-3">
      <FormItem v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
      <Input v-model:model-value="editedData.price" placeholder="Цена"/>
      <Input v-model:model-value="editedData.qty" placeholder="Кол-во" />
      <Input :model-value="editedData.price * editedData.qty" disabled placeholder="Сумма" />
      <Button type="submit">Отправить данные</Button>
    </Form>
    <div class="flex justify-between items-center gap-3">
      <div class="">{{itemsStore.item.price}}</div>
      <div class="">{{itemsStore.item.qty}}</div>
      <div class="">{{itemsStore.item.amount}}</div>
      <div class="">{{itemsStore.item}}</div>
    </div>
  </div>
</template>
