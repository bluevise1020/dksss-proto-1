<template>
  <NuxtLayout>
    <div class="w-full min-h-max">
      <C_PdfDksss />
    </div>

    <template #header>
      <C_HeaderPaper :paper-title="details.applicant?.title" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { usePaper } from "~/composables/paper";
  import C_HeaderPaper from "~/components/header/paper.vue";
  import C_PdfDksss from "~/components/pdf/dksss.vue";

  const Paper = usePaper();

  const { params } = useRoute();
  const paperId = computed(() => (Array.isArray(params.id) ? params.id[0] : params.id));

  const { error } = await useAsyncData("/pages/paper/:id", async () => {
    const pid = paperId.value ?? "";
    const data = await $fetch(`/pages/paper/${pid}`);
    Paper.setData({ paper: data.paper });
  });

  if (error.value) {
    throw createError(error.value ?? "処理を続行できませんでした。");
  }

  const { details } = Paper;
</script>
