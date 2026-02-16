import type { Id } from "src/common/types/entity.type";

type AccessTokenPayload = {
  userId: Id;
  userName?: string;
};

export type { AccessTokenPayload };
