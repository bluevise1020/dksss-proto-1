import type { Dayjs } from "dayjs";

const Formats = {
  ISO: "YYYY-MM-DDTHH:mm:ss.SSSZZ",
  TIMESTAMP: "YYYY-MM-DD HH:mm:ss",
  YMD: "YYYY-MM-DD",
  YMDJP: "YYYY年MM月DD日",
  YM: "YYYY-MM",
  YMJP: "YYYY年MM月",
  MD: "MM-DD",
  MDJP: "MM月DD日",
  D: "DD",
  DJP: "DD日",
};

export type Datetime = Dayjs | Date | number | string | null | undefined;

export function useFormatter() {
  function commas(val?: any) {
    return Number(val) === val ? val.toLocaleString() : val;
  }

  function dash(val?: any) {
    return val ?? "-";
  }

  const dayjs = useDayjs();

  function fmtYMDJP(datetime?: Datetime) {
    return dayjs(datetime).format(Formats.YMDJP);
  }

  return { commas, dash, fmtYMDJP };
}
