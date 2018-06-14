export type configFields = {
  field: string,
  displayName: string,
  type: string,
  prefix: string,
  postfix: string,
  prescision: string,
  sortable?: boolean,
  total: {
    fn?: string,
    text?: string
  }
};
export type filtersSourseData = {
  value: string,
  displayName: string,
  type: string,

  name: string,
  default?: string,

  sourceData?: {
    url: string,
    params: Array<{
      type: string,
      name: string
    }>,
    field: string
  }
};

export type configSheet = {
  name: string,
  displayName: string,
  fields: Array<configFields>,

  sourceData: {
    url: string,
    filters: Array<filtersSourseData>
  }
};

export type ContentTable = {
  initialData: (dateFrom: string, dateTo: string, url: string) => void,
  initialOtherData: (queryParams: string, url: string, field: string) => void,
  sheet: {},
  loader: boolean,
  configSheet: configSheet
};
