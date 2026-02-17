import type { Id } from "src/common/types/entity.type";

type AccessTokenPayload = {
  userId: Id;
  profileId?: Id;
  userName?: string;
};

export type { AccessTokenPayload };
