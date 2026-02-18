import { HttpResponse } from "../enums/http.enum";

interface ApiEndpointOptions {
  summary: string;
  authRequired?: boolean;
  successMessage?: string;
  createdMessage?: string;
  notFoundMessage?: string;
  noContentMessage?: string;
}

interface MessageStructure {
  summary?: string;
  responses?: Partial<Record<HttpResponse, string>>;
}

export type { ApiEndpointOptions, MessageStructure };
