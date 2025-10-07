<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';

document.documentElement.classList.add('dark');
</script>

<template>
  <Toaster />
  <div class="grid gap-5 p-10">
    <FormComponent />
  </div>
</template>
