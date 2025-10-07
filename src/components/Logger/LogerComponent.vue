<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useLogStore } from '@/stores/useLogsStore.ts';
import LoggerItem from '@/components/Logger/LoggerItem.vue';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import AreYouSureModal from '@/components/Modals/AreYouSureModal.vue';

const logStore = useLogStore();
const isLogsOpen = ref<boolean>(false);
const isClearLogsModalOpen = ref<boolean>(false);

const clearDialogHandler = () => {
  logStore.clearLogs();
  isClearLogsModalOpen.value = false;
};
</script>

<template>
  <Card>
    <CardHeader class="flex justify-between items-center px-10">
      <div class="text-2xl">Логи</div>
      <div>
        <AreYouSureModal
          v-if="logStore.logs.length > 0"
          v-model:dialog="isClearLogsModalOpen"
          trigger-name="Отчистить логи"
          action-button="Отчистить"
          @action="clearDialogHandler"
        />
      </div>
    </CardHeader>
    <CardContent class="grid gap-3">
      <div v-if="logStore.logs.length > 0" class="grid gap-3">
        <LoggerItem
          v-for="item in !isLogsOpen ? logStore.logs.slice(0, 7) : logStore.logs"
          :key="item.id"
          :log="item"
        />
      </div>
      <div v-else class="m-auto text-xl">Логов пока что нет</div>
    </CardContent>
    <CardFooter>
      <Button
        v-if="logStore.logs.length > 7"
        class="text-xl text-center cursor-pointer bg-neutral-700 hover:bg-neutral-600 text-white w-full h-20"
        @click="isLogsOpen = !isLogsOpen"
      >
        {{ !isLogsOpen ? 'Ещё' : 'Скрыть' }}
      </Button>
    </CardFooter>
  </Card>
</template>
