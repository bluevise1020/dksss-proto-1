<template>
  <div v-if="loading" class="w-full embed-height flex justify-center items-center bg-zinc-600">
    <div class="w-[30%] text-center">
      <UProgress animation="carousel" />
      <p>PDF を生成中...</p>
    </div>
  </div>

  <embed v-else :src="src" type="application/pdf" class="w-full embed-height" />
</template>

<style scoped lang="scss">
  .embed-height {
    height: calc(100vh - 72px);
  }
</style>

<script setup lang="ts">
  const PdfDksss = usePdfDksss();

  const loading = ref(true);
  const src = ref("");

  onMounted(async () => {
    try {
      loading.value = true;
      src.value = await PdfDksss.generate({ navpanes: false, toolbar: true });
    } finally {
      loading.value = false;
    }
  });
</script>
