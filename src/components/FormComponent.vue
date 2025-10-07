<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useItemsStore } from '@/stores/useItemsStore.ts';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm, useFormValues } from 'vee-validate';
import { computed, watch } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { useLogStore } from '@/stores/useLogsStore.ts';
import type { IItem } from '@/types/Item/IItem.ts';
import { useDebounceFn } from '@vueuse/core';

const itemsStore = useItemsStore();
const logStore = useLogStore();
const amount = computed(() => Number(values.value.price || 0) * Number(values.value.qty || 0)); // Считает сумму
const { toast } = useToast();

// Схема формы для валидации
const formSchema = toTypedSchema(
  z.object({
    price: z.number({ message: 'Поле должно быть числом' }).min(1, 'Цена должна быть больше 0'),
    qty: z.number({ message: 'Поле должно быть числом' }).min(1, 'Количество должно быть больше 0'),
    amount: z.number({ message: 'Поле должно быть числом' }).optional(),
  }),
);

// Создание формы с дэфолтными значениями
const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: formSchema,
  initialValues: {
    price: itemsStore.item.price ?? 0,
    qty: itemsStore.item.qty ?? 0,
    amount: itemsStore.item.amount ?? 0,
  },
});

const values = useFormValues();

// Отправка данных на сервер после валидации
const submitValues = handleSubmit(async (values) => {
  logStore.createLog({
    type: 'submitPress',
    info: 'Отправить данные',
  });
  const currentValues: Partial<IItem> = JSON.parse(JSON.stringify(values));

  await itemsStore.updateItem(values).then((res) => {
    if (!res) return;

    logStore.createLog({
      type: 'hasResponse',
      info: `отправлено: ${JSON.stringify(values)}, в localStorage: ${JSON.stringify(itemsStore.item)}`,
    });

    if (res.success) {
      toast({
        title: 'Успешно',
        description: 'Мы успешно сохранили ваши данные',
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Ошибка сохранения данных',
        variant: 'destructive',
      });
    }
  });
});

const debouncedLog = useDebounceFn((inputNum: number) => {
  values.value.amount = Number(values.value.price || 0) * Number(values.value.qty || 0);
  logStore.createLog({
    type: 'inputChange',
    info: inputNum.toString(),
  });
}, 300);

const logChangedInput = (inputNum: number) => {
  debouncedLog(inputNum);
};
</script>

<template>
  <div class="grid gap-5">
    <form class="flex justify-between items-end gap-3" @submit="submitValues">
      <FormField v-slot="{ componentField }" name="price" :validate-on-blur="!isFieldDirty">
        <FormItem class="flex-1">
          <FormLabel>Цена</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="number"
              placeholder="Цена товара"
              @input="logChangedInput(1)"
            />
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
            <Input
              v-bind="componentField"
              type="number"
              placeholder="Кол-во"
              @input="logChangedInput(2)"
            />
          </FormControl>
          <div class="min-h-[20px]">
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="amount">
        <FormItem class="flex-1">
          <FormLabel>Сумма</FormLabel>
          <FormControl>
            <Input v-bind="componentField" type="number" disabled @input="logChangedInput(3)" />
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
