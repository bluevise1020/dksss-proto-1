import type { Issue, Papers, Tag } from "~/types/main";

export const usePapersStore = defineStore(
  // store id
  "papers",

  // store setup
  () => {
    const _dataPapers = ref<{
      items: Papers;
    }>({
      items: [],
    });

    const _dataFilter = ref<{
      issue: Issue | undefined;
      tag: Tag | undefined;
    }>({
      issue: undefined,
      tag: undefined,
    });

    const papersItems = computed({
      get: () => _dataPapers.value.items,
      set: (val: Papers) => (_dataPapers.value.items = val),
    });

    const filterIssue = computed({
      get: () => _dataFilter.value.issue,
      set: (val: Issue | undefined) => (_dataFilter.value.issue = val),
    });

    const filterTag = computed({
      get: () => _dataFilter.value.tag,
      set: (val: Tag | undefined) => (_dataFilter.value.tag = val),
    });

    return { filterIssue, filterTag, papersItems };
  },

  // store options
  {},
);

export function usePapers() {
  const Store = usePapersStore();

  function setData({ papers }: { papers?: Papers }): void {
    if (papers) Store.papersItems = papers;
  }

  function filter(issue: Issue | undefined, tag: Tag | undefined): void {
    Store.filterIssue = issue;
    Store.filterTag = tag;
  }

  function clear(): void {
    Store.filterIssue = undefined;
    Store.filterTag = undefined;
  }

  const papers = computed(() => {
    let retval: Papers = Store.papersItems;

    if (Store.filterTag) {
      const tag = Store.filterTag;
      retval = retval.filter((item) => item.tag === tag);
    }

    if (Store.filterIssue) {
      const issue = Store.filterIssue;
      if (typeof issue === "number") {
        retval = retval.filter((item) => item.approve?.issue === issue);
      }
      if (issue === "approvables") {
        retval = retval.filter((item) => !item.approve?.issue);
      }
    }

    return retval;
  });

  return { clear, filter, papers, setData };
}
