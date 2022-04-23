export interface SameAPIEndpoint {
  [key: string]: string[]
}

export interface Params {
  [key: string]: unknown;
}

export interface JSONForm {
  [key: string]: unknown;
}

interface RequestRecord {
  url: string;
  form: JSONForm | FormData;
}

export interface GetListRequest {
  url: string;
  _search?: string;
  initialFilterParams?: object;
  pagination?: {
    page?: number;
    rowsPerPage?: number;
    count?: number;
  }
}

export interface CreateRequest extends RequestRecord {}

export interface UpdateRequest extends RequestRecord {
  lookupValue: string | number;
}

export interface RetrieveRequest {
  url: string;
  lookupValue: string | number;
}

export interface DeleteRequest {
  url: string;
  lookupValue: string | number;
  hardDelete?: boolean;
  field?: string;
}

export interface RequestResponse {
  isActionSucceed: boolean;
  value: unknown
}
