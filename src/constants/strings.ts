export const DEFAULT_PAGE_TITLE = "lexie.ai test";
export const makePageTitle = (title?: string) =>
  title ? `${title} | lexie.ai test` : DEFAULT_PAGE_TITLE;
