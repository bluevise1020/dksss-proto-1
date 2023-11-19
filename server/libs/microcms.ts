import type { MicroCMSQueries } from "microcms-js-sdk";

export { FetchError } from "ofetch";

const RunConf = useRuntimeConfig();

function apiUrl(path: string): string {
  let retval = RunConf.apiBaseUrl ?? "";
  if (retval.endsWith("/")) retval = retval.slice(0, -1);
  return retval + path;
}

function queryString(queries?: MicroCMSQueries): string {
  if (!queries) return "";

  let retval = "?";

  if ("fields" in queries) {
    retval += retval === "?" ? "fields=" : "&fields=";
    if (typeof queries.fields === "string") retval += queries.fields;
    if (Array.isArray(queries.fields)) retval += queries.fields.join(",");
  }

  if ("filters" in queries) {
    retval += retval === "?" ? "filters=" : "&filters=";
    retval += queries.filters;
  }

  return retval;
}

export async function fetchGet<T>(path: string, queries?: MicroCMSQueries): Promise<T | undefined> {
  const url = apiUrl(path) + queryString(queries);
  const headers = { "X-MICROCMS-API-KEY": RunConf.apiKey ?? "" };
  const res = await $fetch(url, { method: "GET", headers });
  return res as T | undefined;
}
