interface ApiResponse<T = any> {
  data: T;
  message?: string;
  timestamp?: string;
  statusCode: number;
}

export type { ApiResponse };
