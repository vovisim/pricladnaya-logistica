<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { ILog } from '@/types/Log/ILog.ts';

const { log } = defineProps<{
  log: ILog;
}>();
</script>

<template>
  <Card>
    <CardHeader>
      {{ log.title }}
    </CardHeader>
    <CardContent>
      {{ log.content }}
    </CardContent>
  </Card>
</template>
