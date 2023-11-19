import type { API_pages_paper_id } from "~/types/main";

export const usePaperStore = defineStore(
  // store id
  "paper",

  // store setup
  () => {
    const _dataPaper = ref<API_pages_paper_id["paper"]>({
      id: "",
      applicant: {},
      proxyApplicant: {},
      request: {},
      approve: {},
      createdAt: "",
      updatedAt: "",
    });

    const paperDetails = computed({
      get: () => _dataPaper.value,
      set: (val) => (_dataPaper.value = val),
    });

    return { paperDetails };
  },

  // store options
  {},
);

export function usePaper() {
  const Store = usePaperStore();

  function setData({ paper }: { paper: API_pages_paper_id["paper"] }): void {
    if (paper) Store.paperDetails = paper;
  }

  const details = computed(() => Store.paperDetails);

  return { details, setData };
}

export function usePDF() {
  return {};
}
