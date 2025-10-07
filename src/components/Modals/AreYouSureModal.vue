<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

defineProps<{
  triggerName: string;
  title?: string;
  text?: string;
  actionButton?: string;
  cancelButton?: string;
}>();

const emits = defineEmits<{
  (name: 'action'): void;
}>();

const dialog = defineModel<boolean>('dialog');
</script>

<template>
  <Dialog v-model:open="dialog">
    <DialogTrigger as-child>
      <Button> {{ triggerName }} </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {{ title ?? 'Вы уверены?' }}
        </DialogTitle>
        <DialogDescription>
          {{
            text ??
            'Эти изменения нельзя будет откатить или вернуть обратно. Вы уверены что хотите это сделать?'
          }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary"> {{ cancelButton ?? 'Отмена' }} </Button>
          <Button type="button" color="#49d51c" @click="emits('action')">
            {{ cancelButton ?? 'Подтвердить' }}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
