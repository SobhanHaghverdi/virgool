interface BaseClientResponse<T = any> {
  data: T;
  message?: string;
  statusCode: number;
}

interface ClientResponse<T = any> extends BaseClientResponse<T> {
  timestamp: string;
}

type ApiResponse<T> = Promise<BaseClientResponse<T>>;
export type { ClientResponse, ApiResponse, BaseClientResponse };
