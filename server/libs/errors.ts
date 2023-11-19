export const PaperNotfoundError = createError({
  message: "指定の申請書が見付かりません。",
  statusCode: 404,
  statusMessage: `paper/not-found`,
});

export const PaperError = createError({
  message: "処理を続行できませんでした。",
  statusCode: 500,
  statusMessage: `paper/error`,
});

export const PapersError = createError({
  message: "処理を続行できませんでした。",
  statusCode: 500,
  statusMessage: `papers/error`,
});
