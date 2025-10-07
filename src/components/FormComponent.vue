<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useItemsStore } from '@/stores/useItemsStore.ts';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm, useFormValues } from 'vee-validate';
import { computed } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';

const itemsStore = useItemsStore();
const amount = computed(() => Number(values.value.price || 0) * Number(values.value.qty || 0));
const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    price: z.number({ message: 'Поле должно быть числом' }).min(1, 'Цена должна быть больше 0'),
    qty: z.number({ message: 'Поле должно быть числом' }).min(1, 'Количество должно быть больше 0'),
    amount: z.number({ message: 'Поле должно быть числом' }).optional(),
  }),
);

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: formSchema,
  initialValues: {
    price: itemsStore.item.price ?? 0,
    qty: itemsStore.item.qty ?? 0,
    amount: itemsStore.item.amount ?? 0,
  },
});

const values = useFormValues();

const submitValues = handleSubmit(async (values) => {
  await itemsStore.updateItem(values).then((res) => {
    if (!res) return;

    if (res.success) {
      toast({
        title: 'Успешно',
        description: 'Мы успешно сохранили ваши данные',
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Ошибка сохранения данных',
      });
    }
  });
});
</script>

<template>
  <div class="grid gap-5">
    <form class="flex justify-between items-end gap-3" @submit="submitValues">
      <FormField v-slot="{ componentField }" name="price" :validate-on-blur="!isFieldDirty">
        <FormItem class="flex-1">
          <FormLabel>Цена</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Цена товара" v-bind="componentField" />
          </FormControl>
          <div class="min-h-[20px]">
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="qty" :validate-on-blur="!isFieldDirty">
        <FormItem class="flex-1">
          <FormLabel>Кол-во</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Кол-во" v-bind="componentField" />
          </FormControl>
          <div class="min-h-[20px]">
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField name="amount">
        <FormItem class="flex-1">
          <FormLabel>Сумма</FormLabel>
          <FormControl>
            <Input type="number" :value="amount" disabled />
          </FormControl>
          <div class="min-h-[20px]">
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <Button type="submit" class="flex-1 mb-[28px]">Отправить данные</Button>
    </form>
    <div class="flex justify-between items-center gap-3">
      <label class="flex-1">{{ itemsStore.item.price }}</label>
      <label class="flex-1">{{ itemsStore.item.qty }}</label>
      <label class="flex-1">{{ itemsStore.item.amount }}</label>
      <label class="flex-1">{{ itemsStore.item }}</label>
    </div>
  </div>
</template>
