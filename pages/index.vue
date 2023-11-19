<template>
  <NuxtLayout>
    <UContainer>
      <UCard>
        <div class="flex flex-col gap-4">
          <template v-for="(item, idx) in papers" :key="item.id">
            <div v-if="idx > 0" class="border-t border-gray-200"></div>
            <div class="block">
              <NuxtLink :to="`/paper/${item.id}`">
                <div class="flex flex-col lg:flex-row lg:gap-4 lg:justify-between">
                  <div>
                    <span>{{ item.title }}</span>
                    <span v-if="item.approve?.issue">&nbsp;第{{ item.approve?.issue }}号</span>
                  </div>
                  <div class="flex flex-col justify-items-end lg:flex-row lg:gap-2">
                    <div class="flex items-center">
                      <span>申請日：</span>
                      <span v-if="item.applicant?.applicatedAt" class="w-[120px]">{{
                        fmtYMDJP(item.applicant?.applicatedAt)
                      }}</span>
                      <span v-else class="w-[120px]">―</span>
                    </div>
                    <div class="flex items-center">
                      <span>承認日：</span>
                      <span v-if="item.approve?.approvedAt" class="w-[120px]">{{
                        fmtYMDJP(item.approve?.approvedAt)
                      }}</span>
                      <span v-else class="w-[120px] text-red-700">承認待ち</span>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>
      </UCard>
    </UContainer>

    <template #header>
      <C_HeaderDefault @clear="clear" @filter="filter" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import type { API_pages_idx } from "~/types/main";
  import { useFormatter } from "~/composables/formatter";
  import { usePapers } from "~/composables/papers";
  import { useSelections } from "~/composables/selections";
  import C_HeaderDefault from "~/components/header/default.vue";

  const { fmtYMDJP } = useFormatter();
  const Papers = usePapers();
  const Selections = useSelections();

  const { data, error } = await useFetch<API_pages_idx>("/pages/idx");
  Papers.setData({ papers: data.value?.papers });
  Selections.setData({ papers: data.value?.papers });

  if (error.value) {
    throw createError(error.value ?? "処理を続行できませんでした。");
  }

  const { clear, filter, papers } = Papers;
</script>
