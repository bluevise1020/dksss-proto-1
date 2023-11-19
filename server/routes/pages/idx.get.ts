import type { MicroCMSListResponse } from "microcms-js-sdk";
import { PapersError } from "~/server/libs/errors";
import { fetchGet } from "~/server/libs/microcms";

interface RetVal {
  papers: Array<Record<string, any>> | undefined;
  issues: Array<number> | undefined;
  tags: Array<{ tag: "dksss"; title: string }> | undefined;
}

export default defineEventHandler(async (): Promise<RetVal> => {
  let papers: RetVal["papers"];

  try {
    const data = await fetchGet<MicroCMSListResponse<any>>("/v1/dksss/");
    if (data?.contents) papers = data?.contents;
  } catch (exception) {
    throw PapersError;
  }

  if (!papers) throw PapersError;

  // TODO: 本来的には tags に紐づく issues としてまとめる。
  const issues: RetVal["issues"] = [];
  for (const paper of papers) {
    issues.push(paper.approve.issue ?? null);
  }

  const tags: RetVal["tags"] = [];
  for (const paper of papers) {
    tags.push({ tag: paper.tag ?? "dksss", title: paper.title ?? "" });
  }

  return { papers, issues, tags };
});
