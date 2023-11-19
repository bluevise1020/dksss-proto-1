import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export type ApplicationDate = string;
export type ApprovalDate = string;
export type ID = string;
export type Issue = number | string;
export type Tag = "dksss";
export type Title = string;

export interface PaperTag {
  tag: Tag;
  title: Title;
}
export type PaperTags = Array<PaperTag>;

export type PaperIssues = Array<Issue>;

export type Paper = {
  title?: Title;
  applicant?: Record<string, any>;
  proxyApplicant?: Record<string, any>;
  request?: Record<string, any>;
  approve?: Record<string, any>;
  tag?: Tag;
  applicationDate?: ApplicationDate;
  approvalDate?: ApprovalDate;
} & MicroCMSContentId &
  MicroCMSDate;
export type Papers = Array<Paper>;

export interface API_pages_idx {
  papers: Papers;
  issues: PaperIssues;
  tags: PaperTags;
}

export interface API_pages_paper_id {
  paper: Paper;
}

export interface API {
  "/"?: API_pages_idx;

  papers: {
    list: () => Papers;
    get: (id: ID) => Paper | undefined;
  };
  issues: {
    list: () => PaperIssues;
  };
  tags: {
    list: () => PaperTags;
    get: (id: ID) => PaperTag | undefined;
  };
}
