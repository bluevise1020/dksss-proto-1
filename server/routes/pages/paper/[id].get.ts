import { PaperError, PaperNotfoundError } from "~/server/libs/errors";
import { FetchError, fetchGet } from "~/server/libs/microcms";
import type { API_pages_paper_id } from "~/types/main";

export default defineEventHandler(async (event): Promise<API_pages_paper_id> => {
  const paperId = getRouterParam(event, "id") ?? undefined;
  if (!paperId) throw PaperNotfoundError;

  let paper;

  try {
    paper = await fetchGet<API_pages_paper_id["paper"]>(`/v1/dksss/${paperId}`);
  } catch (exception) {
    if (exception instanceof FetchError) {
      if (exception.statusCode === 404) {
        throw PaperNotfoundError;
      }
    }
    throw PaperError;
  }

  if (!paper) throw PaperNotfoundError;

  return { paper };
});
