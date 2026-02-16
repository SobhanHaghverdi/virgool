interface ApiEndpointOptions {
  summary: string;
  authRequired?: boolean;
  successMessage?: string;
  createdMessage?: string;
  notFoundMessage?: string;
  noContentMessage?: string;
}

export type { ApiEndpointOptions };
