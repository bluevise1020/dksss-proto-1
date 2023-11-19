<template>
  <header class="sticky w-full">
    <UContainer class="flex justify-between items-center py-[20px] h-[72px]">
      <h1 class="h-[32px] text-2xl font-semibold">{{ siteTitle }}</h1>
      <div class="flex items-center gap-[6px]">
        <USelect v-model="tagsSelected" :options="tagsOptions" class="h-[32px]" />
        <USelect v-model="issuesSelected" :options="issuesOptions" class="h-[32px]" />
        <UButton label="絞り込む" class="h-[32px]" @click="clickFilter" />
        <UButton color="white" label="クリア" class="h-[32px]" @click="clickClear" />
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
  import { DEFAULT_ISSUE, DEFAULT_TAG, useSelections } from "~/composables/selections";
  import type { Issue, Tag } from "~/types/main";

  const emit = defineEmits<{
    (event: "clear"): void;
    (event: "filter", issue: Issue | undefined, tag: Tag | undefined): void;
  }>();

  const RunConf = useRuntimeConfig();
  const Selections = useSelections();

  const siteTitle = ref(RunConf.public.siteTitle);

  const { issuesOptions, issuesSelected, tagsOptions, tagsSelected } = Selections;

  function clickClear() {
    issuesSelected.value = DEFAULT_ISSUE;
    tagsSelected.value = DEFAULT_TAG;
    emit("clear");
  }
  function clickFilter() {
    emit("filter", issuesSelected.value, tagsSelected.value);
  }
</script>
