import type { Template, Font } from "@pdfme/common";
import { generate as generatePdf } from "@pdfme/generator";
import FontNotoSerifJP from "~/assets/font/NotoSerifJP-Regular.otf";
import PdfDksssBase from "~/assets/pdf/dksss.pdf";

const template: Template = {
  basePdf: PdfDksssBase,
  schemas: [
    {
      applicantDateY: {
        type: "text",
        fontSize: 11,
        position: { x: 149, y: 11.5 },
        width: 20,
        height: 11,
      },
      applicantDateM: {
        type: "text",
        fontSize: 11,
        position: { x: 160, y: 11.5 },
        width: 20,
        height: 11,
      },
      applicantDateD: {
        type: "text",
        fontSize: 11,
        position: { x: 171, y: 11.5 },
        width: 20,
        height: 11,
      },
      applicantAddress: {
        type: "text",
        fontSize: 11,
        position: { x: 132, y: 27 },
        width: 100,
        height: 11,
      },
      applicantName: {
        type: "text",
        fontSize: 11,
        position: { x: 132, y: 37 },
        width: 100,
        height: 11,
      },
      applicantContact: {
        type: "text",
        fontSize: 11,
        position: { x: 136, y: 47 },
        width: 100,
        height: 11,
      },

      proxyApplicantAddress: {
        type: "text",
        fontSize: 11,
        position: { x: -200, y: 0 }, // TODO: 位置を決める
        width: 100,
        height: 11,
      },
      proxyApplicantName: {
        type: "text",
        fontSize: 11,
        position: { x: -200, y: 0 }, // TODO: 位置を決める
        width: 100,
        height: 11,
      },
      proxyApplicantContact: {
        type: "text",
        fontSize: 11,
        position: { x: -200, y: 0 }, // TODO: 位置を決める
        width: 100,
        height: 11,
      },

      // TODO: requestPurpose1-7 を挿入する
      requestPurpose8: {
        type: "text",
        fontSize: 13,
        position: { x: 75, y: 124 },
        width: 100,
        height: 11,
      },
      requestPurposeOther: {
        type: "text",
        fontSize: 11,
        position: { x: 95, y: 124.5 },
        width: 100,
        height: 11,
      },
      requestAddress: {
        type: "text",
        fontSize: 11,
        position: { x: 75.5, y: 134 },
        width: 150,
        height: 11,
      },
      requestDateStartY: {
        type: "text",
        fontSize: 11,
        position: { x: 86, y: 145.5 },
        width: 20,
        height: 11,
      },
      requestDateStartM: {
        type: "text",
        fontSize: 11,
        position: { x: 96, y: 145.5 },
        width: 20,
        height: 11,
      },
      requestDateStartD: {
        type: "text",
        fontSize: 11,
        position: { x: 109, y: 145.5 },
        width: 20,
        height: 11,
      },
      requestDateEndY: {
        type: "text",
        fontSize: 11,
        position: { x: 130, y: 145.5 },
        width: 20,
        height: 11,
      },
      requestDateEndM: {
        type: "text",
        fontSize: 11,
        position: { x: 141, y: 145.5 },
        width: 20,
        height: 11,
      },
      requestDateEndD: {
        type: "text",
        fontSize: 11,
        position: { x: 152, y: 145.5 },
        width: 20,
        height: 11,
      },
      requestReason: {
        type: "text",
        fontSize: 11,
        position: { x: 75.5, y: 153 },
        width: 150,
        height: 22,
      },
      requestMethod1: {
        type: "text",
        fontSize: 13,
        position: { x: 79, y: 165 },
        width: 20,
        height: 11,
      },
      // TODO: 施工業者を挿入する
      // TODO: 施工数量を挿入する
      requestMethod2: {
        type: "text",
        fontSize: 13,
        position: { x: 79, y: 175 },
        width: 20,
        height: 11,
      },
      requestDocument1: {
        type: "text",
        fontSize: 13,
        position: { x: 75, y: 201 },
        width: 20,
        height: 11,
      },
      // TODO: requestDocument2-5 を挿入する
      requestDocument6: {
        type: "text",
        fontSize: 13,
        position: { x: 75, y: 211 },
        width: 20,
        height: 11,
      },
      requestDocumentsOther: {
        type: "text",
        fontSize: 9,
        position: { x: 128, y: 212 },
        width: 100,
        height: 11,
      },

      approveDivision: {
        type: "text",
        fontSize: 9,
        position: { x: 145, y: 236 },
        width: 40,
        height: 11,
      },
      approveIssue: {
        type: "text",
        fontSize: 11,
        alignment: "center",
        position: { x: 163, y: 236 },
        width: 15,
        height: 11,
      },
      approveDateY: {
        type: "text",
        fontSize: 11,
        position: { x: 40, y: 250.5 },
        width: 20,
        height: 11,
      },
      approveDateM: {
        type: "text",
        fontSize: 11,
        position: { x: 51, y: 250.5 },
        width: 20,
        height: 11,
      },
      approveDateD: {
        type: "text",
        fontSize: 11,
        position: { x: 62, y: 250.5 },
        width: 20,
        height: 11,
      },
      approveTerm2: {
        type: "text",
        fontSize: 10.5,
        position: { x: 48.5, y: 276 },
        width: 100,
        height: 11,
      },
      approveTerm3: {
        type: "text",
        fontSize: 10.5,
        position: { x: 48.5, y: 281.5 },
        width: 100,
        height: 11,
      },
    },
  ],
};

function configureInputs(data: Record<string, any>) {
  const Dayjs = useDayjs();

  function confDateY(date: string): string {
    if (!date) return "";
    return (Dayjs(date).year() - 2018).toString();
  }

  function confDateM(date: string): string {
    if (!date) return "";
    return (Dayjs(date).month() + 1).toString();
  }

  function confDateD(date: string): string {
    if (!date) return "";
    return Dayjs(date).date().toString();
  }

  function confCheck(identifier: string, purpose: string[]) {
    const item = purpose.find((item) => item.startsWith(identifier));
    return item ? "○" : "";
  }

  return [
    {
      applicantDateY: confDateY(data.applicant?.applicatedAt),
      applicantDateM: confDateM(data.applicant?.applicatedAt),
      applicantDateD: confDateD(data.applicant?.applicatedAt),
      applicantAddress: data.applicant?.address ?? "",
      applicantName: data.applicant?.name ?? "",
      applicantContact: data.applicant?.contact ?? "",

      proxyApplicantAddress: data.proxyApplicant?.address ?? "",
      proxyApplicantName: data.proxyApplicant?.name ?? "",
      proxyApplicantContact: data.proxyApplicant?.contact ?? "",

      requestPurpose1: confCheck("(1)", data.request?.purpose),
      requestPurpose2: confCheck("(2)", data.request?.purpose),
      requestPurpose3: confCheck("(3)", data.request?.purpose),
      requestPurpose4: confCheck("(4)", data.request?.purpose),
      requestPurpose5: confCheck("(5)", data.request?.purpose),
      requestPurpose6: confCheck("(6)", data.request?.purpose),
      requestPurpose7: confCheck("(7)", data.request?.purpose),
      requestPurpose8: confCheck("(8)", data.request?.purpose),
      requestPurposeOther: data.request?.purposeOther ?? "",
      requestAddress: data.request?.address ?? "",
      requestDateStartY: confDateY(data.request?.dateStart),
      requestDateStartM: confDateM(data.request?.dateStart),
      requestDateStartD: confDateD(data.request?.dateStart),
      requestDateEndY: confDateY(data.request?.dateEnd),
      requestDateEndM: confDateM(data.request?.dateEnd),
      requestDateEndD: confDateD(data.request?.dateEnd),
      requestReason: data.request?.reason ?? "",
      requestMethod1: confCheck("(1)", data.request?.method),
      requestMethod2: confCheck("(2)", data.request?.method),
      requestDocument1: confCheck("(1)", data.request?.documents),
      requestDocument2: confCheck("(2)", data.request?.documents),
      requestDocument3: confCheck("(3)", data.request?.documents),
      requestDocument4: confCheck("(4)", data.request?.documents),
      requestDocument5: confCheck("(5)", data.request?.documents),
      requestDocument6: confCheck("(6)", data.request?.documents),
      requestDocument7: confCheck("(7)", data.request?.documents),
      requestDocumentsOther: data.request?.documentsOther ?? "",

      approveDivision: (data.approve?.division ?? [])[0] ?? "",
      approveIssue: (data.approve?.issue ?? "").toString(),
      approveDateY: confDateY(data.approve?.approvedAt),
      approveDateM: confDateM(data.approve?.approvedAt),
      approveDateD: confDateD(data.approve?.approvedAt),
      approveTerm2: (data.approve?.term2 ?? [])[0] ?? "",
      approveTerm3: (data.approve?.term3 ?? [])[0] ?? "",
    },
  ];
}

export function usePdfDksss() {
  const Paper = usePaper();

  const inputs = configureInputs(Paper.details.value);

  async function generate(options?: {
    navpanes?: Boolean;
    page?: Number;
    scrollbar?: Boolean;
    statusbar?: Boolean;
    toolbar?: Boolean;
    view?: "Fit" | "FitW" | "FitH";
    zoom?: Number;
  }): Promise<string> {
    options = {
      navpanes: true,
      page: undefined,
      scrollbar: true,
      statusbar: true,
      toolbar: true,
      view: undefined,
      zoom: undefined,
      ...options,
    };
    let retval = "";

    const font: Font = {
      NotoSansJP: {
        data: await fetch(FontNotoSerifJP).then((res) => res.arrayBuffer()),
        fallback: true,
      },
    };
    const pdf = await generatePdf({ template, inputs, options: { font } });
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    retval = URL.createObjectURL(blob);

    const params = [
      options.navpanes && options.toolbar ? "navpanes=1" : "navpanes=0",
      options.page ? `page=${options.page}` : undefined,
      options.scrollbar ? "scrollbar=1" : "scrollbar=0",
      options.statusbar ? "statusbar=1" : "statusbar=0",
      options.toolbar ? "toolbar=1" : "toolbar=0",
      options.view ? `view=${options.view}` : undefined,
      options.zoom ? `zoom=${options.zoom}` : undefined,
    ].filter((v) => v);
    retval += "#" + params.join("&");

    return retval;
  }

  async function open(): Promise<void> {
    const src = await generate();
    window.open(src);
  }

  return { generate, open };
}
