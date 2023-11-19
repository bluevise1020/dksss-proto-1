<template>
  <header class="sticky w-full">
    <UContainer class="flex justify-between items-center py-[20px] h-[72px]">
      <h1 class="h-[32px] text-2xl font-semibold">{{ siteTitle }}</h1>
      <UButton color="white" label="戻る" class="h-[32px]" @click="navigateTo('/')" />
    </UContainer>
  </header>
</template>

<script setup lang="ts">
  const RunConf = useRuntimeConfig();

  const siteTitle = ref(RunConf.public.siteTitle);
</script>
