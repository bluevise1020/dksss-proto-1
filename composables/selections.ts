import type { Issue, PaperIssues, PaperTags, Papers, Tag } from "~/types/main";

export const DEFAULT_ISSUE: Issue | undefined = undefined;
export const DEFAULT_TAG: Tag | undefined = "dksss";

export const useSelectionsStore = defineStore(
  // store id
  "selections",

  // store setup
  () => {
    const _dataIssues = ref<{
      items: PaperIssues;
      selected: Issue | undefined;
    }>({
      items: [],
      selected: DEFAULT_ISSUE,
    });

    const issuesItems = computed({
      get: () => _dataIssues.value.items,
      set: (val: PaperIssues) => (_dataIssues.value.items = val),
    });

    const issuesSelected = computed({
      get: () => _dataIssues.value.selected,
      set: (val: Issue | undefined) => {
        if (typeof val === "string" && /^[0-9]+$/.test(val)) {
          _dataIssues.value.selected = parseInt(val);
        } else if (typeof val === "number" || typeof val === "string") {
          _dataIssues.value.selected = val;
        } else {
          _dataIssues.value.selected = undefined;
        }
      },
    });

    const _dataTags = ref<{
      items: PaperTags;
      selected: Tag | undefined;
    }>({
      items: [],
      selected: DEFAULT_TAG,
    });

    const tagsItems = computed({
      get: () => _dataTags.value.items,
      set: (val: PaperTags) => (_dataTags.value.items = val),
    });

    const tagsSelected = computed({
      get: () => _dataTags.value.selected,
      set: (val: Tag | undefined) => {
        if (typeof val === "string") {
          _dataTags.value.selected = val;
        } else {
          _dataTags.value.selected = undefined;
        }
      },
    });

    return { issuesItems, issuesSelected, tagsItems, tagsSelected };
  },

  // store options
  {},
);

export function useSelections() {
  const Store = useSelectionsStore();

  function setData({ papers }: { papers?: Papers }): void {
    const issues: PaperIssues = [];
    const tags: PaperTags = [];

    if (papers) {
      papers.forEach((paper) => {
        tags.push({ tag: paper.tag ?? "dksss", title: paper.title ?? "dksss" });
        // TODO: 本来的には tags に紐づく issues としてまとめる。
        issues.push(paper.approve?.issue ?? 0);
      });
    }

    Store.issuesItems = issues;
    Store.tagsItems = tags;
  }

  const issuesOptions = computed(() => {
    const retval: Array<{ label: string; value: Issue | undefined }> = [];
    // 最初の空項目
    retval.push({ label: "", value: undefined });
    // 承認待ち
    retval.push({ label: "承認待ち", value: "approvables" });
    // 選択項目
    Store.issuesItems.forEach((v) => {
      if (v) retval.push({ label: `第${v}号`, value: v });
    });
    return retval;
  });

  const tagsOptions = computed(() => {
    const retval: Array<{ label: string; value: Tag | undefined }> = [];
    // 最初の空項目
    retval.unshift({ label: "", value: undefined });
    // 選択項目
    Store.tagsItems.forEach((v) => {
      retval.push({ label: v.title, value: v.tag });
    });
    return retval;
  });

  const { issuesSelected, tagsSelected } = storeToRefs(Store);

  return {
    issuesOptions,
    issuesSelected,
    tagsOptions,
    tagsSelected,
    setData,
  };
}
